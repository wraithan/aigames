var fs = require('fs')
var request = require('request')
var jsdom = require('jsdom')

var path = require('path')
var authPayload = require(path.join(process.cwd(), '.aigamesrc'))

if (process.argv.length !== 4) {
  throw new Error('filename is a required argument')
}

var filename = process.argv[3]

if (!path.isAbsolute(filename)) {
  filename = path.join(process.cwd(), filename)
}

if (!fs.existsSync(filename)) {
  throw new Error('file ' + filename + ' does not exist')
}

console.log('index')
request({
  method: 'GET',
  uri: 'http://theaigames.com/',
  jar: true
}, function handleIndex (err, res, body) {
  if (err) {
    return console.error(err)
  }
  jsdom.env(
    body,
    ['http://code.jquery.com/jquery.js'],
    function getFirstPage (errors, window) {
      var pieces = window.$('#login-form-sider').children('input')
      for (var i = 0; i < pieces.length; ++i) {
        var piece = pieces[i]
        if (piece.type === 'hidden') {
          login(piece.name, piece.value)
        }
      }
    }
  )
})

function login(key, value) {
  console.log('login')

  authPayload[key] = value

  request.post({
    uri: 'http://theaigames.com/sign-in',
    jar: true,
    formData: authPayload
  }, function handleSignIn (err, res, body) {
    if (err) {
      return console.error(err)
    }
    if (res.statusCode > 399) {
      console.error('died for some reason')
      return console.error(body)
    }
  })
  upload()
}

function upload() {
  console.log('upload')
  fs.createReadStream(filename)
  var req = request.post({
    uri: 'http://theaigames.com/competitions/warlight-ai-challenge-2/bots/new',
    jar: true,
    headers: {
      'Content-Disposition': 'form-data; name="botfile"; filename="zenwarbot.zip"',
      'Content-Type': 'application/zip'
    }
  }, function handleSignIn (err, res, body) {
    if (err) {
      return console.error(err)
    }
    if (res.statusCode > 399) {
      console.error('died for some reason')
      return console.error(body)
    }
    console.log('succesfully uploaded %s', filename)
  })
  var form = req.form()
  form.append(
    'botfile',
    fs.createReadStream(filename),
    {filename: path.basename(filename)}
  )
}
