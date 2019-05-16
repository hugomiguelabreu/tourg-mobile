# <img height='65' src="https://github.com/hugomiguelabreu/tourg-mobile-guide/blob/master/assets/images/tour-white.png"/>
### tourg - Your instant guide

tourg is a mobile application with the pretension of offering a seamless tourist experience to the end-user.

[:iphone: Guide mobile app](https://github.com/hugomiguelabreu/tourg-mobile)

[:cloud: REST API](https://github.com/hugomiguelabreu/tourg-cloud)

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
Adriana Pereira - [@AdrianaGrey](https://github.com/AdrianaGrey)

Hugo Abreu - [@hugomiguelabreu](https://github.com/hugomiguelabreu)

João Reis - [@jibreis](https://github.com/jibreis)

## Cloud team
Afonso Fontes - [@afonsopf](https://github.com/afonsopf)

Bruno Renato - [@brfc](https://github.com/brfc)

João Padrão - [@jpadrao](https://github.com/jpadrao)

