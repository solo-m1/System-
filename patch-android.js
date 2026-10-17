// Run after `npx cap add android`. Adds permissions, fixed signing and the notification icon.
const fs=require('fs'),path=require('path');
const A=path.join(process.cwd(),'android');
if(!fs.existsSync(A)){console.error('android/ folder not found. Run "npx cap add android" first.');process.exit(1);}
// 1. manifest permissions
const mf=path.join(A,'app/src/main/AndroidManifest.xml');
let m=fs.readFileSync(mf,'utf8');
['POST_NOTIFICATIONS','SCHEDULE_EXACT_ALARM','USE_EXACT_ALARM','RECEIVE_BOOT_COMPLETED','VIBRATE','WAKE_LOCK'].forEach(p=>{
  const line='<uses-permission android:name="android.permission.'+p+'" />';
  if(!m.includes('android.permission.'+p+'"'))m=m.replace(/<\/manifest>/,'    '+line+'\n</manifest>');
});
fs.writeFileSync(mf,m);
// 2. fixed signing key, so a new build installs over the old one and keeps your data
const gf=path.join(A,'app/build.gradle');
let g=fs.readFileSync(gf,'utf8');
if(!g.includes('thesystem-signing')){
  const block=`
    // thesystem-signing
    signingConfigs {
        thesystem {
            storeFile file("../../android-signing/app.keystore")
            storePassword "android"
            keyAlias "androiddebugkey"
            keyPassword "android"
        }
    }
`;
  g=g.replace(/android\s*\{/,m0=>m0+block);
  g=g.replace(/buildTypes\s*\{/,m0=>m0+`
        debug {
            signingConfig signingConfigs.thesystem
        }`);
  fs.writeFileSync(gf,g);
}
// 3. notification icon (white vector)
const dr=path.join(A,'app/src/main/res/drawable');fs.mkdirSync(dr,{recursive:true});
fs.writeFileSync(path.join(dr,'ic_stat_system.xml'),`<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="24dp" android:height="24dp" android:viewportWidth="24" android:viewportHeight="24">
  <path android:fillColor="#FFFFFFFF" android:pathData="M12,2 L21,6 V12 C21,17 17,21 12,22 C7,21 3,17 3,12 V6 Z M11,6 V13 H8 L13,18 V11 H16 Z"/>
</vector>
`);
console.log('Android project patched.');
