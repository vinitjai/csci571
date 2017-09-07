<?php


function getURLForFacebookAPI(){
       
        $Keyword = $_GET["Keyword"];
        $Type = $_GET["Type"];
        
        if(empty($_GET["Type"])){
        $queryString = "q=".$Keyword."&type=user&fields=%20id,name,picture.width(700).height(700)&access_token=EAACSq6IqfXYBAKrLnLIrKVgH4CUDRXfFNbi98HTY8jRmJpV0OIZAybpitEw4bugBAtroZCNXCofSvzVNvj3Tn3MEhHvnFPvrgX0eqQ88BhZCHxZAB7zdOtq094fUZCK9HsLBrVH4nbZBZCZBp63AmTCL1OZBQcWIZCJxM9ArXEe4ZArHiwgzxFR02F1";
        }
        elseif($Type == "place")
        {
            
        //https://graph.facebook.com/v2.8/search?q=The_Keyword_to_be_searched&type=place&center= 34.028418,-118.283953&distance=1000&fields= id,name,picture.width(700).height(700)&access_token=Your_Access_Token
          $Lat = "34.0211029053";
          $Lon = "-118.2891769409";
          $queryString = "q=".$Keyword."&type=".urlencode($Type).htmlspecialchars("&center=").$Lat.",".$Lon."&fields=%20id,name,picture.width(700).height(700)&access_token=EAACSq6IqfXYBAKrLnLIrKVgH4CUDRXfFNbi98HTY8jRmJpV0OIZAybpitEw4bugBAtroZCNXCofSvzVNvj3Tn3MEhHvnFPvrgX0eqQ88BhZCHxZAB7zdOtq094fUZCK9HsLBrVH4nbZBZCZBp63AmTCL1OZBQcWIZCJxM9ArXEe4ZArHiwgzxFR02F1";  
        }
        else
        {
            $queryString = "q=".$Keyword."&type=".urlencode($Type)."&fields=%20id,name,picture.width(700).height(700)&access_token=EAACSq6IqfXYBAKrLnLIrKVgH4CUDRXfFNbi98HTY8jRmJpV0OIZAybpitEw4bugBAtroZCNXCofSvzVNvj3Tn3MEhHvnFPvrgX0eqQ88BhZCHxZAB7zdOtq094fUZCK9HsLBrVH4nbZBZCZBp63AmTCL1OZBQcWIZCJxM9ArXEe4ZArHiwgzxFR02F1";
        }
        $URL = "https://graph.facebook.com/v2.8/search?limit=10&".$queryString;
        
        return $URL;
    }

function getURLForFacebookAPIFROMID(){

$URL = "https://graph.facebook.com/v2.8/".$_GET["id"]."?fields=albums.limit(5){name,photos.limit(2){name,%20picture}},posts.limit(5){message,created_time}&access_token=EAACSq6IqfXYBAKrLnLIrKVgH4CUDRXfFNbi98HTY8jRmJpV0OIZAybpitEw4bugBAtroZCNXCofSvzVNvj3Tn3MEhHvnFPvrgX0eqQ88BhZCHxZAB7zdOtq094fUZCK9HsLBrVH4nbZBZCZBp63AmTCL1OZBQcWIZCJxM9ArXEe4ZArHiwgzxFR02F1";
    
    return $URL;

    
    
}


function getURLForFacebookAPIFROMIMD(){
    
//https://graph.facebook.com/v2.8/1084855054970797/picture?access_token=EAAIwhTYF8uoBADTbDE0ICzCBoySZAk74GzpmuZC3xk3fVhALZAtGSPtwwwSmX656STmMKFn9mQxDMgwsDgxYXoejMuNeLXFQ5LxIQaCZADpqGULZCs9Nl5bwPhJnlXEMZCpAsZAeLzZAQeNW1BtPUS8CgkGKZB6vLPHcZD

$URL = "https://graph.facebook.com/v2.8/".$_GET["imdd"]."/picture?redirect=false&access_token=EAACSq6IqfXYBAKrLnLIrKVgH4CUDRXfFNbi98HTY8jRmJpV0OIZAybpitEw4bugBAtroZCNXCofSvzVNvj3Tn3MEhHvnFPvrgX0eqQ88BhZCHxZAB7zdOtq094fUZCK9HsLBrVH4nbZBZCZBp63AmTCL1OZBQcWIZCJxM9ArXEe4ZArHiwgzxFR02F1";
    
   // echo $URL;
    
    return $URL;

    
    
}

if(isset($_GET["id"]))
{
   // echo $_GET["Id"];
  $URL = getURLForFacebookAPIFROMID();
    //echo $URL;
}
elseif(isset($_GET["imdd"])){
    $URL = getURLForFacebookAPIFROMIMD();
}
elseif(isset($_GET["onlyurl"])){
    $URL = $_GET["onlyurl"];
}
else{
$URL = getURLForFacebookAPI();
}

$data = array();

//$data['res'] = $URL;


$data['res'] = json_decode(file_get_contents($URL));


echo json_encode($data);

?>
