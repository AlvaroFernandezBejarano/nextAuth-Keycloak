# Next-js + Next-auth + keycloak v21 with Role base access control example & demo


This is a example ready to deploy with docker of implementing toghether next-auth and keycloak v21+ and setting a base for a role base access control on your next-js app.


It kinda bugged me that there are so little updated info on next-auth with keycloak as a provider, and even less when I checked that roles were even left out of the session obj and you could not easily set a Role base access control! 

This demo has too the logout redirect fixed for keycloak v21+!

# &#x1F4BB; Deploy

The components in this demo are:
1. Next.js (deployed locally)
2. Keycloak (deployed in docker container)

## Requirements

Developed & tested on:

- Node.js v16.20.0
- npm v8.19.4
- Docker v24.0.2
- docker-compose v1.27.4

I sneaked [BulmaCSS](https://bulma.io/) on the project because it's simple, light and is one of my favorites CSS frameworks. I would recommend you to check it out!



## Deployment

Clone the git repo:

```cmd
git clone https://github.com/AlvaroFernandezBejarano/nextAuth-keycloakV21.git
```

Then use docker-compose to start the container of keycloak.
```cmd
docker-compose up -d
```

Go to `nextauth-keycloak` dir:
```cmd
cd nextauth-keycloak
```

And install packages:
```cmd
npm i
```

And finally, start the `next.js` app:
```cmd
npm run dev
```


And you will have a next app running on your `localhost:3000` and a keycloak accessible on `localhost:8180`.

If you reuquire access to keycloak:
- `User`: admin
- `Password`: password
> These are written on the docker-compose

For log in on the next app, lets continue to features



# &#x1F3C6; Features

This example/demo features a next.js app that serves:

- A `home` page, accessible by anyone (unauthorized access)
- A `secure but visible` page, that will redirect to `home` if not authorized.
- A `secured` page, not visible on the navbar unless authorized. Will redirect to `home` if not authorized.
- A `secured by role` page, not visible on the navbar unless authorized. Will redirect to a special `no role required` page if user doesn't have the required role.
- A custom `logout` to fix the error of "next-auth logout doesn't close the keycloak session" to keycloak v21+.

Keycloak already comes with a realm and users set.

You have `usera` & `userb`, both with password `password`.

`usera` has the **REALM** role required to access the `secured by role` page, but `userb` doesn't. Think that I did only used on the example a **REALM** role, but could be a **CLIENT** or whatever you do on your keycloak settings.

See my [next-auth](nextauth-keycloak/pages/api/auth/[...nextauth].ts), alredy left some hints on how to adapt it to other types of roles (the schema of the expected JWT will be different so you need to adapt it!)




## &#x1F41B; Debugging

I let some `console.log` on the next.js app server side where you can check what info from your JWT token you recive & work.

And I commented usefull things on code if you dig into it!




## &#x1F914; Who are you?

Nice question! I'm a DevOps fullstack on the IoT sector and I'm looking for new oportunities!
Check my profile & maybe connect with me on [linkedin](https://www.linkedin.com/in/álvaro-fernández-bejarano-0ba827182)!

