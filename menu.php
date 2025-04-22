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
                "convert" => ["icon" => "⿻", "text" => "CONVERT", "color" => "plum"]
            ];
            foreach($buttons as $key => $value) {
                echo "<button style='width:15em;; background-color: ".$value["color"]."' onclick=window.location.href='".$webURL.$key."'><b><big><big>".$value["icon"]."</big></big></b> ".$value["text"]."</button><p></p>";
            }
        ?>
    </body>
</html>