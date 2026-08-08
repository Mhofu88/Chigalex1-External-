const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/locales', express.static(path.join(__dirname, 'public/locales')));
app.use('/css', express.static(path.join(__dirname, 'css')));

const LANGUAGES = [
  {code:'en', name:'English'},
  {code:'af', name:'Afrikaans'},
  {code:'am', name:'Amharic'},
  {code:'ar', name:'العربية'},
  {code:'fr', name:'Français'},
  {code:'ha', name:'Hausa'},
  {code:'ig', name:'Igbo'},
  {code:'kg', name:'Kikongo'},
  {code:'lg', name:'Luganda'},
  {code:'ln', name:'Lingala'},
  {code:'rw', name:'Kinyarwanda'},
  {code:'sn', name:'Shona'},
  {code:'so', name:'Somali'},
  {code:'st', name:'Sesotho'},
  {code:'sw', name:'Swahili'},
  {code:'tn', name:'Setswana'},
  {code:'ts', name:'Xitsonga'},
  {code:'tw', name:'Twi'},
  {code:'wo', name:'Wolof'},
  {code:'xh', name:'Xhosa'},
  {code:'yo', name:'Yorùbá'},
  {code:'zu', name:'Zulu'},
  {code:'zgh', name:'Tamazight'},
  {code:'nr', name:'Ndebele'}
];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/languages', (req, res) => {
  res.json(LANGUAGES);
});

module.exports = { app, LANGUAGES };