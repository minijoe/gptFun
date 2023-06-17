<?php
if (isset($_GET['q']))
    echo file_get_contents('https://github.com/search?q=' . urlencode($_GET['q']) . (isset($_GET['p']) ? ('&p=' . $_GET['p']) : '') . '&type=Repositories');