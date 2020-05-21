export const exmapleHtml = `<html maaa=aa >
<head>
    <style>
        body div #myid{
            width:100px;
            background-color: #ff5000;
        }
        body div.box1.box2#box { width:100px; height: 100px;  background-color: #ff0000; }
        body .box1.box2#box{ background-color: #0000ff; }
        img {
            height: 30px;
        }
        body div img{
            width:30px;
            background-color: #ff1111;
        }
        h1 {
            color: red;
        }
        body {
            background: #f3f3f3;
        }
    </style>
</head>
<body>
    <h1>hello world</h1>     
    <div>
        <div id='box' class='box1 box2'></div>
        <img id="myid" />
        <img />
    </div>
</body>
</html>
`
