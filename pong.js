 var canvas = document.getElementById('myCanvas');
            var ctx = canvas.getContext('2d');
 
            canvas.width = 800;
            canvas.height = 600;
			
			var leftScore = 0;
			var rightScore = 0;
 
            var leftPaddle = {
                x: 10,
                y: 10,
                width: 20,
                height: 75,
                speed: 200,
                color: '#c00'
            };

            var rightPaddle = {
                x: 770,
                y: 10,
                width: 20,
                height: 75,
                speed: 200,
                color: '#0c0'
            };

            var ball = { 
                x: 200,
                y: 20,
                width: 10,
                height: 10,
                xspeed: 200,
				yspeed: 200,
                color: '#00c'
            };
 
            var keysDown = {};
            window.addEventListener('keydown', function(e) {
                keysDown[e.keyCode] = true;
            });
            window.addEventListener('keyup', function(e) {
                delete keysDown[e.keyCode];
            });

            function update(mod) {
                
				ball.x += ball.xspeed * mod;
				ball.y += ball.yspeed * mod;
				
				checkCollisions(mod);
				
				if(ball.x + ball.width > canvas.width )
				{
					leftScore++;
					ball.xspeed = -ball.xspeed;
					ball.x += ball.xspeed * mod;
					reset(0);
	            }

				if(ball.x < 0)
				{
					rightScore++;
					ball.xspeed = -ball.xspeed;
					ball.x += ball.xspeed * mod;
					reset(1);
				}
				if(ball.y + ball.height > canvas.height || ball.y < 0)
				{
					ball.yspeed = -ball.yspeed;
					ball.y += ball.yspeed * mod;
				}

                if (37 in keysDown) {
                    rightPaddle.x -= leftPaddle.speed * mod;
                }
                if (38 in keysDown) {
                    rightPaddle.y -= leftPaddle.speed * mod;
                }
                if (39 in keysDown) {
                    rightPaddle.x += leftPaddle.speed * mod;
                }
				if(40 in keysDown){
					rightPaddle.y += leftPaddle.speed * mod;
				}
                if (83 in keysDown) {
                    leftPaddle.y += leftPaddle.speed * mod;
                }
				if(87 in keysDown) {
					leftPaddle.y -= leftPaddle.speed * mod;
				}
				
				
            }
 
            function render() {
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = leftPaddle.color;
                ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
                ctx.fillStyle = rightPaddle.color;
                ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
                ctx.fillStyle = ball.color;
                ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
				
				ctx.fillStyle = "red";
				ctx.font = "bold 16px Arial";
				ctx.fillText(leftScore, 95, 30);
				
				ctx.fillStyle = "green";
				ctx.font = "bold 16px Arial";
				ctx.fillText(rightScore, 700, 30);
				
            }
 
            function run() {
                update((Date.now() - time) / 1000);
                render();
                time = Date.now();
            }
			
			function reset(paddle) {
				ball.y = ((Math.random() * 600) + 1);
				if(paddle == 0)
				{
					ball.x = 30;
					ball.xspeed = 200;
					ball.yspeed = 200;
				}
				else
				{
					ball.x = 760;
					ball.xspeed = -200;
					ball.yspeed = 200;
				}
			}
			
			function checkCollisions(mod) {
			// Check Left Paddle Straight On
				if(ball.x + ball.width > leftPaddle.x + leftPaddle.width
					&& ball.x < leftPaddle.x + leftPaddle.width
					&& ball.y > leftPaddle.y
					&& ball.y + ball.height < leftPaddle.y + leftPaddle.height)
					{
						ball.xspeed = -ball.xspeed;
						ball.x += ball.xspeed * mod;
					}
			
			// Check Right Paddle Straight On
				if(ball.x + ball.width > rightPaddle.x
					&& ball.x < rightPaddle.x
					&& ball.y > rightPaddle.y
					&& ball.y + ball.height < rightPaddle.y + rightPaddle.height)
					{
						ball.xspeed = -ball.xspeed;
						ball.x += ball.xspeed * mod;
					}
			}
 
            var time = Date.now();
            setInterval(run, 10);