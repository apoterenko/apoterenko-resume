package qiwi.util.image;

import javax.validation.constraints.NotNull;
import java.util.Arrays;

public class ImageInfo {

	private final long id;
	private final String suffix;
	private final String mimeType;
	private final byte[] data;

	protected ImageInfo(Builder builder) {
		this.suffix = builder.suffix;
		this.id = builder.id;
		this.mimeType = builder.mimeType;
		this.data = builder.data;
	}

	public String getSuffix() {
		return suffix;
	}

	public long getId() {
		return id;
	}

	public String getMimeType() {
		return mimeType;
	}

	@NotNull
	public byte[] getData() {
		return data;
	}

	public boolean hasData() {
		return data.length > 0;
	}

	public static Builder builder() {
		return new Builder();
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof ImageInfo)) return false;

		final ImageInfo imageInfo = (ImageInfo) o;

		return id == imageInfo.id
				&& Arrays.equals(data, imageInfo.data)
				&& !(mimeType != null ? !mimeType.equals(imageInfo.mimeType) : imageInfo.mimeType != null)
				&& !(suffix != null ? !suffix.equals(imageInfo.suffix) : imageInfo.suffix != null);
	}

	@Override
	public int hashCode() {
		int result = (int) (id ^ (id >>> 32));
		result = 31 * result + (suffix != null ? suffix.hashCode() : 0);
		result = 31 * result + (mimeType != null ? mimeType.hashCode() : 0);
		result = 31 * result + (data != null ? Arrays.hashCode(data) : 0);
		return result;
	}

	public static class Builder {

		private String suffix;
		private long id;
		private String mimeType;
		private byte[] data;

		protected Builder() {
		}

		public Builder suffix(String suffix) {
			this.suffix = suffix;
			return this;
		}

		public Builder id(long id) {
			this.id = id;
			return this;
		}

		public Builder mimeType(String mimeType) {
			this.mimeType = mimeType;
			return this;
		}

		public Builder data(byte[] data) {
			this.data = data;
			return this;
		}

		public ImageInfo build() {
			return new ImageInfo(this);
		}
	}
}