Name:           imigo-front
Version:        %{version}
Release:        0
Summary:        imigo-me static files
Group:          Applications/Internet
License:        Proprietary
URL:            https://imigo.me
Vendor:         Kaboom
Prefix:         %{_prefix}
Packager:       techinfra@kabym.ru
BuildArch:      noarch
BuildRoot:      %{_tmppath}/%{name}-root

%description
It's just static files that need to be served from nginx.

%prep
rm -rf $RPM_BUILD_DIR/dist
tar -xf $RPM_SOURCE_DIR/imigo-front*.tar.gz

%build


%install
echo $RPM_BUILD_ROOT
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT
mkdir -p $RPM_BUILD_ROOT/opt/imigo-front
cp mobile.html $RPM_BUILD_ROOT/opt/imigo-front
cp dist/favicon.ico $RPM_BUILD_ROOT/opt/imigo-front
cp index.html $RPM_BUILD_ROOT/opt/imigo-front
cp -r dist $RPM_BUILD_ROOT/opt/imigo-front
rm $RPM_BUILD_ROOT/opt/imigo-front/dist/cdn_config.js -f
cp -r jspm_packages $RPM_BUILD_ROOT/opt/imigo-front
cp -r docs $RPM_BUILD_ROOT/opt/imigo-front
cp -r admin $RPM_BUILD_ROOT/opt/imigo-front

%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT

%files
%defattr(-,root,root)
/opt/imigo-front/favicon.ico
/opt/imigo-front/mobile.html
/opt/imigo-front/index.html
/opt/imigo-front/dist
/opt/imigo-front/admin
/opt/imigo-front/jspm_packages
/opt/imigo-front/docs

%changelog
