<!doctype html>
<html>
    <head>
        <title>AudioWorklet</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        </style>
    </head>
    <body>
        <h2><a href="<?php echo $webURL; ?>">↵</a> AudioWorklet</h2>
        <?php
            echo "<script src='audioworklet.js?ver=".$srcVersion."'></script>";
            $buttons = ["random", "square"];
            for ($b = 0; $b < count ($buttons); $b++) {
                $key = $buttons[$b];
                echo "<button style='width:8em; background-color:lightGreen' onclick='press(\"".$key."\", \"play\")'><big>⏵︎</big><br>".$key."</button>";
                echo "<button style='width:8em; background-color:tomato' onclick='press(\"".$key."\", \"stop\")'><big>⏹︎</big><br>".$key."</button>";
                echo "<button style='width:8em; background-color:yellow' onclick='press(\"".$key."\", \"pause\")'><big>⏸︎</big><br>".$key."</button>";
                echo "<div></div>";
            }
            echo "<div ></div>";
            echo "<div> </div>";
            echo "<div id='log'></div>";
        ?>
    </body>
</html>