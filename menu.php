<!doctype html>
<html>
    <head>
        <title>SANDBOX</title>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        <h2>SANDBOX</h2>
        <?php
          
            $buttons = [
                "manicminersounds" => ["icon" => "♫", "text" => "MANIC MINER", "color" => "gold"],
                "jetsetwillysounds" => ["icon" => "♫", "text" => "JET SET WILLY", "color" => "gold"],
                "music" => ["icon" => "♫", "text" => "MUSIC", "color" => "orange"],
                "samplemusic" => ["icon" => "♫", "text" => "SAMPLE MUSIC", "color" => "orange"],
                "audioworklet" => ["icon" => "♫", "text" => "AUDIO WORKLET", "color" => "yellow"],
                "convert" => ["icon" => "⿻", "text" => "CONVERT", "color" => "plum"]
            ];
            foreach($buttons as $key => $value) {
                echo "<button style='width:17em;; background-color: ".$value["color"]."' onclick=window.location.href='".$webURL.$key."'><b><big><big>".$value["icon"]."</big></big></b> ".$value["text"]."</button><p></p>";
            }
        ?>
    </body>
</html>