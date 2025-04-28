<!doctype html>
<html>
    <head>
        <title>JET SET WILLY sound tester</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        </style>
    </head>
    <body>
        <h2><a href="<?php echo $webURL; ?>">↵</a> JET SET WILLY sound tester</h2>
        <?php
            echo "<script src='jetsetwillysounds.js?ver=".$srcVersion."'></script>";
            $colors = [
                "_" => ["ok" => "119, 225, 119", "prepare" => "250, 127, 211", "empty" => "242, 242, 242"],
                "bin" => ["ok" => "130, 182, 238", "false" => "157, 168, 179", "prepare" => "250, 127, 211", "empty" => "242, 242, 242"]
            ];
            $buttons = [
                "introMusic" => ["status" => "ok", "binStatus" => "ok"],
                "screechSound" => ["status" => "prepare", "binStatus" => "ok"],
                "gameMusic7" => ["status" => "ok", "binStatus" => "ok"],
                "gameMusic6" => ["status" => "ok", "binStatus" => "ok"],
                "gameMusic5" => ["status" => "ok", "binStatus" => "ok"],
                "gameMusic4" => ["status" => "ok", "binStatus" => "ok"],
                "gameMusic3" => ["status" => "ok", "binStatus" => "ok"],
                "gameMusic2" => ["status" => "ok", "binStatus" => "ok"],
                "gameMusic1" => ["status" => "ok", "binStatus" => "ok"],
                "gameMusic0" => ["status" => "ok", "binStatus" => "ok"],
                "itemSound" => ["status" => "ok", "binStatus" => "ok"],
                "arrowSound" => ["status" => "ok", "binStatus" => "ok"],
                "jumpSound" => ["status" => "ok", "binStatus" => "ok"],
                "fallingSound" => ["status" => "prepare", "binStatus" => "ok"],
                "crashSound" => ["status" => "ok", "binStatus" => "ok"],
                "gameOverSound" => ["status" => "ok", "binStatus" => "ok"],
                "tapeLoadSound" => ["status" => "prepare", "binStatus" => "false"],
                "pressKeyboardSound" => ["status" => "ok", "binStatus" => "false"]
            ];
            foreach($buttons as $key => $value) {
                if ($value["status"] != "false") {
                    echo "<button style='width:15em;; background-color:rgb(".$colors["_"][$value["status"]].")' onclick='start(\"".$key."\")'>▶<br>".$key."</button>";
                }
                if ($value["binStatus"] != "false") {
                    echo "<button style='width:17em;; background-color:rgb(".$colors["bin"][$value["binStatus"]].")' onclick='start(\"bin".strtoupper($key[0]).substr($key,1)."\")'>▶<br>BIN:".$key."</button>";
                }
                echo "<div></div>";
            }
            echo "<div ></div>";
            echo "<div> </div>";
            echo "<div id='log'></div>";
        ?>
    </body>
</html>