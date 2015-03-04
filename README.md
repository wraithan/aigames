# aigames

## install

```
npn install aigames -g 
```

I've tested on Node.js 0.10.21 because that is what theaigames.com uses and I was too lazy to change versions, patches welcome if you need it to work other places.

## usage

Create a file where you are going to run `aigames` from (such as your bot dir) named `.aigamesrc` with contents like:

```
{
  "login": "email (or maybe username?)",
  "password": "password in plain text"
}
```

Then invoke `aigames` like so:

```
aigames upload <relative or absolute path to compressed file>
```

## improvements

This project should not be used as an example of best practices, it is a one off script. That said, improvements are welcome! If you are doing something more structural please open an issue to discuss it first (or otherwise chat with me, Wraithan).
