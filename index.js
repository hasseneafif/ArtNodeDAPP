import Web3 from 'web3';

const express = require('express');
const app = express();

import configuration from './build/contracts/Arts.json';
import 'bootstrap/dist/css/bootstrap.css';
import artpic0 from './images/art0.jpg';
import artpic1 from './images/art1.jpg';
import artpic2 from './images/art2.jpg';
import artpic3 from './images/art3.jpg';
import artpic4 from './images/art4.jpg';
import artpic5 from './images/art5.jpg';
import artpic6 from './images/art6.jpg';
import artpic7 from './images/art7.jpg';
import artpic8 from './images/art8.jpg';
import artpic9 from './images/art9.jpg';

class Art {
  constructor(titre, description,date,image,price,utilisateur) {
    this.titre = titre;
    this.description = description;
    this.date = date;
    this.image = image;
    this.price = price;
    this.utilisateur = utilisateur;
  }
}




const createElementFromString = (string) => {
  const el = document.createElement('div');
  el.innerHTML = string;
  return el.firstChild;
};

const CONTRACT_ADDRESS =
  configuration.networks['5777'].address;

  const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
  Web3.givenProvider || 'http://192.168.1.11:7545'
);
const contract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
);

let account

const accountEl = document.getElementById('account');
const artsEl = document.getElementById('arts');
const TOTAL_ARTS = 20;
const EMPTY_ADDRESS =
  '0x0000000000000000000000000000000000000000';

function updateStatus(status) {
  const statusEl = document.getElementById('status');
  statusEl.innerHTML = status;
  console.log(status);
}


const mintArt = async (art) => {
  await contract.methods
    .mintArt(art.titre,art.description,art.date,art.image,art.price,art.utilisateur,'0')
    .send({ from: account});
    await refreshArts();
};



const buyArt = async (art) => {
  await contract.methods
    .buyArt(art.id)
    .send({ from: account, value: art.price });
    await refreshArts();
};

const refreshArts = async () => {
  artsEl.innerHTML = '';
  for (let i = 0; i < TOTAL_ARTS; i++) {
    const art = await contract.methods.arts(i).call();
    art.id = i;
   
 
    if (art.owner === EMPTY_ADDRESS) {
      const artEl = createElementFromString(
        `<div class="art card" style="width: 18rem;">
          <img src="${art.image}" class="card-img-top" alt="..." >
          <div class="card-body">
            <h5 class="card-title">${art.titre}</h5>
            <p class="card-text">${
              art.price / 1e18
            } Eth</p>
            <button class="btn btn-primary">Buy Art</button>
          </div>
        </div>`
      );
      artEl.onclick = buyArt.bind(null, art);
      
      artsEl.appendChild(artEl);
    }
  }
};
 

const main = async () => {
  const accounts = await web3.eth.requestAccounts();
  account = accounts[0];
  
  accountEl.innerText = account;

  var art0 = new Art("Bluezilla","Blue Godzilla","15/04/99",artpic0,50,'0x0000000000000000000000000000000000000000')
  var art1 = new Art("Greenzilla","Green Godzilla","15/04/99",artpic1,50,'0x0000000000000000000000000000000000000000')
  var art2 = new Art("Blackzilla","Black Godzilla","15/04/99",artpic2,50,'0x0000000000000000000000000000000000000000')
  var art3 = new Art("Redzilla","Red Godzilla","15/04/99",artpic3,50,'0x0000000000000000000000000000000000000000')
  var art4 = new Art("Whitezilla","White Godzilla","15/04/99",artpic4,50,'0x0000000000000000000000000000000000000000')
  var art5 = new Art("Purplezilla","Purple Godzilla","15/04/99",artpic5,50,'0x0000000000000000000000000000000000000000')
  var art6 = new Art("Pinkzilla","Pink Godzilla","15/04/99",artpic6,50,'0x0000000000000000000000000000000000000000')
  var art7 = new Art("Greyzilla","Grey Godzilla","15/04/99",artpic7,50,'0x0000000000000000000000000000000000000000')
  var art8 = new Art("Neonzilla","Neon Godzilla","15/04/99",artpic8,50,'0x0000000000000000000000000000000000000000')
  var art9 = new Art("Ultrazilla","Ultra Godzilla","15/04/99",artpic9,50,'0x0000000000000000000000000000000000000000')
  
  
 
    mintArt(art0);
    //mintArt(art1);
  // mintArt(art2);
  // mintArt(art3);
  // mintArt(art4);
  // mintArt(art5);
  // mintArt(art6);
  // mintArt(art7);
  // mintArt(art8);
  // mintArt(art9);

  
  await refreshArts();
};



main();










