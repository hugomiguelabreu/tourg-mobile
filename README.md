# <img height='65' src="https://github.com/hugomiguelabreu/tourg-mobile-guide/blob/master/assets/images/tour-white.png"/>
### tourg - Your instant guide

tourg is a mobile application with the pretension of offering a seamless tourist experience to the end-user.

# Deploy
Install all dependencies of the project.
```
npm install
```
Start development environment via expo app.
```
npm start
```
Start development enviroment via adb (android usb debugging / requires android studio)
```
expo start --localhost --android
```

## Common problems
If system number of file watcher reached the limit please run the following command
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

# Team
## Mobile team
Adriana Pereira - @AdrianaGrey

Hugo Abreu - @hugomiguelabreu

João Reis - @jibreis

## Cloud team
Afonso Fontes - @afonsopf

Bruno Renato - @brfc

João Padrão - @jpadrao

