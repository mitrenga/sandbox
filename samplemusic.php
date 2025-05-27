<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Music in the Browser</title>
        <style>
            body {
                margin: 0;
                padding: 0;
            }

            .container {
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .container.playing {
                background: #82b9c4;
            }

            .play {
                border: 4px solid #03303a;
                border-radius: 0;
                font-size: 40px;
                background: #ffffff;
                outline: none;
                text-transform: uppercase;
                width: 200px;
                height: 60px;
                font-family: Helvetica, Arial, sans-serif;
                font-weight: bold;
                color: #03303a;
                padding: 0;
                margin: 0;
            }

            .play:hover {
                cursor: pointer;
                background: #03303a;
                color: #ffffff;
            }
        </style>
    </head>
    <body>
        <script src="samplemusic/lib/index.js?ver=<?php echo $srcVersion ?>" defer></script>
        <h2><a href="<?php echo $webURL; ?>">↵</a> SAMPLE MUSIC</h2>
        <div class="container">
            <button type="button" class="play">Play</button>
        </div>
    </body>
</html>
