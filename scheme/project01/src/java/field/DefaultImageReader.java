package qiwi.util.image;

import com.google.inject.Singleton;

@Singleton
public class DefaultImageReader extends ImageReader {

	DefaultImageReader() {
		super("default.gif");
	}
}