<?php
    $srcVersion = md5(time());
?>
<!doctype html>
<html>
    <head>
        <title>MANIC MINER sound tester</title>
        <?php
            echo "<script src='test.js?ver='".$srcVersion."></script>";
        ?>
    </head>
    <body>
        <h3>MANIC MINER sound tester</h3>
        <button style="background-color:rgb(119, 225, 119)" onclick="start('introMusicPlay')">Play introMusic</button><div id="introMusicPlay"></div>
        <div></div>
        <button style="background-color:rgb(130, 182, 238)" onclick="start('binaryIntroMusicPlay')">Play BIN: introMusic</button><div id="binaryIntroMusicPlay"></div>
        <p></p>
        <button style="background-color:rgb(119, 225, 119)" onclick="start('gameMusicPlay')">Play gameMusic</button><div id="gameMusicPlay"></div>
        <div></div>
        <button style="background-color:rgb(130, 182, 238)" onclick="start('binaryGameMusicPlay')">Play BIN: gameMusic</button><div id="binaryGameMusicPlay"></div>
        <p></p>
        <button style="background-color: rgb(119, 225, 119)" onclick="start('jumpSoundPlay')">Play jumpSound</button><div id="jumpSoundPlay"></div>
        <div></div>
        <button style="background-color: rgb(130, 182, 238)" onclick="start('binaryJumpSoundPlay')">Play BIN: jumpSound</button><div id="binaryJumpSoundPlay"></div>
        <p></p>
        <button style="background-color: rgb(119, 225, 119)" onclick="start('fallingSoundPlay')">Play fallingSound</button><div id="fallingSoundPlay"></div>
        <div></div>
        <button style="background-color: rgb(130, 182, 238)" onclick="start('binaryFallingSoundPlay')">Play BIN: fallingSound</button><div id="binaryFallingSoundPlay"></div>
        <p></p>
        <button style="background-color: rgb(119, 225, 119)" onclick="start('crashSoundPlay')">Play crashSound</button><div id="crashSoundPlay"></div>
        <div></div>
        <button style="background-color: rgb(130, 182, 238)" onclick="start('binaryCrashSoundPlay')">Play BIN: crashSound</button><div id="binaryCrashSoundPlay"></div>
        <p></p>
        <button style="background-color: rgb(119, 225, 119)" onclick="start('gameOverSoundPlay')">Play gameOverSound</button><div id="gameOverSoundPlay"></div>
        <div></div>
        <button style="background-color: rgb(130, 182, 238)" onclick="start('binaryGameOverSoundPlay')">Play BIN: gameOverSound</button><div id="binaryGameOverSoundPlay"></div>
        <p></p>
        <button style="background-color: rgb(119, 225, 119)" onclick="start('airSupplySoundPlay')">Play airSupply</button><div id="airSupplySoundPlay"></div>
        <div></div>
        <button style="background-color: rgb(130, 182, 238)" onclick="start('binaryAirSupplySoundPlay')">Play BIN: airSupply</button><div id="binaryAirSupplySoundPlay"></div>
        <p></p>
        <button style="background-color: rgb(119, 225, 119)" onclick="start('fallingKongSoundPlay')">Play fallingKongSoundPlay</button><div id="fallingKongSoundPlay"></div>
        <div></div>
        <button style="background-color: rgb(130, 182, 238)" onclick="start('binaryFallingKongSoundPlay')">Play BIN: fallingKongSoundPlay</button><div id="binaryFallingKongSoundPlay"></div>
        <p></p>
        <button style="background-color: rgb(119, 225, 119)" onclick="start('escapeSoundPlay')">Play escapeSound</button><div id="escapeSoundPlay"></div>
        <p></p>
        <button style="background-color:rgb(119, 225, 119)" onclick="start('tapeLoadPlay')">Play tapeLoad</button><div id="tapeLoadPlay"></div>
        <div></div>
        <button style="background-color:rgb(130, 182, 238)" onclick="start('binaryTapeLoadPlay')">Play BIN: tapeLoad</button><div id="binaryTapeLoadPlay"></div>
        <p></p>
        <button style="background-color:rgb(119, 225, 119)" onclick="start('pressKeyboardButtonPlay')">Play pressKeyboardButton</button><div id="pressKeyboardButtonPlay"></div>
    </body>
</html>