# <img height='65' src="https://github.com/hugomiguelabreu/tourg-mobile-guide/blob/master/assets/images/tour-white.png"/>
### tourg - Your instant guide

tourg is a mobile application with the pretension of offering a seamless tourist experience to the end-user.

[:iphone: Guide mobile app](https://github.com/hugomiguelabreu/tourg-mobile)

[:cloud: REST API](https://github.com/hugomiguelabreu/tourg-cloud)


# Screens
<div>
  <img height='500' src="https://storage.googleapis.com/servings/Screenshot_2019-01-31-00-21-30-887_com.tourgguide.app.png"/>
  <img height='500' src="https://storage.googleapis.com/servings/Screenshot_2019-02-03-13-20-04-782_com.tourg.app.png"/>
  <img height='500' src="https://storage.googleapis.com/servings/Screenshot_2019-01-31-01-15-43-763_com.tourg.app.png"/>
  <img height='500' src="https://storage.googleapis.com/servings/Screenshot_2019-01-31-01-05-44-590_com.tourg.app.png"/>
  <img height='500' src="https://storage.googleapis.com/servings/Screenshot_2019-01-31-01-06-13-328_com.tourg.app.png"/>
  <img height='500' src="https://storage.googleapis.com/servings/Screenshot_2019-01-31-01-04-45-581_com.tourg.app.png"/>
</div>

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

