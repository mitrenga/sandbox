<!doctype html>
<html>
    <head>
        <title>MUSIC tester</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        </style>
    </head>
    <body>
        <h2><a href="<?php echo $webURL; ?>">↵</a> MUSIC tester</h2>
        <?php
            echo "<script src='music.js?ver=".$srcVersion."'></script>";
            $colors = [
                "_" => ["ok" => "130, 182, 238", "false" => "157, 168, 179", "prepare" => "250, 127, 211", "empty" => "242, 242, 242"]
            ];
            $buttons = [
                "ovcaciCtveraci" => ["status" => "ok"],
                "inTheHallOfTheMountainKing" => ["status" => "ok"]
            ];
            foreach($buttons as $key => $value) {
                if ($value["status"] != "false") {
                    echo "<button style='width:17em;; background-color:rgb(".$colors["_"][$value["status"]].")' onclick='start(\"".$key."\")'>▶<br>".$key."</button>";
                }
                echo "<div></div>";
            }
            echo "<div ></div>";
            echo "<div> </div>";
            echo "<div id='log'></div>";
        ?>
    </body>
</html>