from boto3.session import Session
import os
import os.path
import re
import glob
import argparse
import yaml
import subprocess
import fnmatch

AWS_ACCESS_KEY_ID = os.environ['KABOOM_DPL_S3_KEY']
AWS_SECRET_ACCESS_KEY = os.environ['KABOOM_DPL_S3_SECRET']

session = Session(aws_access_key_id=AWS_ACCESS_KEY_ID,
                  aws_secret_access_key=AWS_SECRET_ACCESS_KEY, region_name='eu-central-1')
s3 = session.resource('s3')

bucket_name = ""
deps = []
artifacts = []


def parse_config(path):
    global deps
    global artifacts
    global bucket_name
    spec = yaml.load(open(path, 'rb'))

    for d in spec.get('depends', []):
        deps.append((d['project'],  d['branch'], d['pattern']))

    for a in spec.get('artifacts', []):
        artifacts.append((a['project'], a['pattern']))

    bucket_name = spec.get('bucket', "")


def get_branch():
    return subprocess.check_output(['git', 'symbolic-ref', '--short', 'HEAD']).decode().strip()

def get_version(string):
    """
    Returns version as tuple (major, minor, build)
    """
    m = re.search('-(\d+)\.(\d+)\.(\d+)-', string)
    return (int(m.group(1)), int(m.group(2)), int(m.group(3)))


def get_dep(project, branch, pattern):
    global s3
    bucket = s3.Bucket(bucket_name)

    files = [ i.key for i in bucket.objects.filter(Prefix="{}/{}/".format(project, branch)) ]
    files_with_pattern = [ (get_version(i), i) for i in fnmatch.filter(files, pattern) ]
    files_with_pattern.sort()
    file_name = files_with_pattern[-1][1]

    print("Downloading: ", file_name)
    obj = s3.Object(bucket_name=bucket.name, key=file_name)
    response = obj.get()
    file = open(os.path.join('deps', os.path.basename(file_name)), 'bw+')
    file.write(response['Body'].read())


def get_deps():
    os.makedirs('deps', exist_ok=True)
    for dep in deps:
        get_dep(dep[0], dep[1], dep[2])


def upload_artifact(project, pattern):
    global s3
    file = glob.glob(pattern)[0]
    key = os.path.join(project, get_branch(), os.path.basename(file))

    print("Uploading {}, to s3 builds folder".format(key))

    s3.Bucket(bucket_name).put_object(Key=key, Body=open(file, 'rb'))


def upload_artifacts():
    global artifacts
    for artifact in artifacts:
        upload_artifact(artifact[0], artifact[1])


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('action', metavar='N', help='download or upload')
    parser.add_argument('-c', '--config', help='path to config file')

    args = parser.parse_args()
    parse_config(args.config)
    if args.action == 'upload':
        upload_artifacts()
    elif args.action == 'download':
        get_deps()
