
export TERM=${TERM:-xterm}

unzip -P "$PROTECTED_PASS" protected.zip

echo "Building Android Local App"
NODE_ENV=development cordova build android -- --keystore="./build.keystore" --storePassword="$STORE_PASSWORD" --alias="voa-zh" --password="$ALIAS_PASSWORD" --target local
mv platforms/android/build/outputs/apk/android-debug.apk platforms/android/build/outputs/apk/android-local.apk

echo "Building Android Beta App"
NODE_ENV=test cordova build android -- --keystore="./build.keystore" --storePassword="$STORE_PASSWORD" --alias="voa-zh" --password="$ALIAS_PASSWORD" --target beta

echo "Building Android Prod App"
NODE_ENV=produection cordova build android --release -- --keystore="./build.keystore" --storePassword="$STORE_PASSWORD" --alias="voa-zh" --password="$ALIAS_PASSWORD" --target prod