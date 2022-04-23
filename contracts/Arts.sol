// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;



contract Arts {
  address public owner = msg.sender;

  struct Art {
     string id;
    string titre;
    string description;
    string date;
    string image;
    uint256 price;
    address owner;
  }


uint256  TOTAL_ARTS=0;
Art[] public arts;





  constructor() { 
Art memory art; 
art.id="0";
art.titre="xx";
art.description="xx";
art.date="xx";
art.image="xx";
art.price=1e17;
art.owner=address(0x0);
arts.push(art);
TOTAL_ARTS++;
  }
  




  function mintArt(string memory titre ,string memory description,string memory date,string memory image,uint256 price,address utilisateur,string memory id ) public  
  {
Art memory art; 
art.id=id;
art.titre=titre;
art.description=description;
art.date=date;
art.image=image;
art.price=price;
art.price=1e17;
art.owner=utilisateur;
arts.push(art);
TOTAL_ARTS++;
  }



  function buyArt(uint256 _index) external payable {
    require(_index < TOTAL_ARTS && _index >= 0);
    require(arts[_index].owner == address(0x0));
    require(msg.value >= arts[_index].price);
    arts[_index].owner = msg.sender;
  }
}