(function(){
    var scrollLeft = 0;
    var leftX = 0; // 未执行完动画宽度
    var offset = 0;
    var count = 0;
    var animateId;
    var current = 2;
    var h = 120, w = 80, g = 15;

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    init();

    function init(){
        // canvas.addEventListener('click', function(e){
        //     var last = current;
        //     var yInItem = e.clientY > 40 && e.clientY < 160;
        //     var xInItem;
        //     var lastStart = 20 * current + 64 * (current - 1);
        //     if(e.clientX < (lastStart + scrollLeft)){
        //         xInItem = Math.floor((e.clientX - scrollLeft)/84);
        //     } else{
        //         xInItem = Math.floor((e.clientX - lastStart - scrollLeft)/84) + current - 1;
        //     }
        //     current = xInItem + 1;
        //     if(last == current || current < 1 || current > 5) return;
        //     render(current, 5, last);
        // })

        let x = 0, y = 0;
        canvas.addEventListener('touchstart', function(e){
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        })

        canvas.addEventListener('touchmove', function(e){
            animateId = Date.now();
            var step = e.touches[0].clientX - x;
            // render2(current, 5, leftX + step, animateId);
            console.log(step);
            scrollLeft += step;
            console.log('scrollLeft:', scrollLeft);
            drawListNew(5, 0, scrollLeft);

            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
            e.preventDefault();
        })

        canvas.addEventListener('touchend', function(){
            x = y = 0;
        })

        drawListNew(5, 0, 2, scrollLeft);

        // render(2, 5, 1);

        // setTimeout(function(){
        //     animateId = Date.now();
        //     render2(current, 5, leftX -  20 - 64, animateId)
        // }, 1000);
        // setTimeout(function(){
        //     animateId = Date.now();
        //     render2(current, 5, leftX - 20 - 64, animateId)
        // }, 2000);
    }

    function render(active, len, last){

        var stamp = 0.2 / 18;
        var count = 0;

        function animate(){
            if(count > 18) {
                if(last !== undefined) scrollLeft = 375/2 - ((active - 1) * 64 + 20 * active + 40);
                return;
            };

            drawList(active, len, last, count, stamp);

            count++;
            requestAnimationFrame(animate);
        }

        animate();
    }

    function render2(active, len, step, Id){
        count = 0
        var stamp = 0.2 / 18;

        function animate(){
            if(count > 18  || Id !== animateId) {
                scrollLeft += step * count / 18;
                return;
            };

            leftX = step * (18 - count - 1)/18;

            drawList2(active, len, count, step);

            count++;
            requestAnimationFrame(animate);
        }

        animate();
    }


    function drawList(active, len, last, count, stamp){
        var scrollStep = ((375/2 - ((active - 1) * 64 + 20 * active + 40) - scrollLeft) / 18) * count;

        ctx.clearRect(-1000, -1000, 10000, 10000);
        var i = 1;
        while(i <= len){
            if(i <= active){
                if(i == last) {
                    ctx.drawImage(drawItem(1 - stamp * count), 20 * i - 16 * (i - 1) + 80 * (i - 1) + scrollStep + scrollLeft, 40 + count * (24/18), w, h);
                    i++;
                    continue;
                }

                let leftStep = last < active && i > last ? 16 - (16/18) * count : 0;
                if(i == active) {
                    ctx.drawImage(drawItem(0.8 + stamp * count), 20 * active + 64 * (active - 1) + leftStep + scrollStep + scrollLeft, 64 - count * (24/18), w, h);
                } else{
                    ctx.drawImage(drawItem(0.8), 20 * i - 16 * (i - 1) + 80 * (i - 1) + leftStep + scrollStep + scrollLeft, 40 + 24, w, h);
                }
            } else{
                let leftStep = last > active && i > active && i <= last ? -(16/18) * (18 - count) : 0;
                if(i == last) {
                    ctx.drawImage(drawItem(1 - stamp * count), 20 * i - 16 * (i - 2) + 80 * (i - 1) + leftStep + scrollStep + scrollLeft, 40 + count * (24/18), w, h);
                    i++;
                    continue;
                }

                ctx.drawImage(drawItem(0.8), 20 * i - 16 * (i - 2) + 80 * (i - 1) + leftStep + scrollStep + scrollLeft, 40 + 24, w, h);
            }
            i++;
        }
    }

    function drawListNew(len, pre, scrollLeft){
        // 清除上一帧
        let maxWidth = len * 84 + 16;
        ctx.clearRect(-maxWidth, 0, 2 * maxWidth, 200);


        var next = -1;
        var lastCenter = 20 * (pre + 1) + 64 * pre + 40;
        var halfWindow = 375/2;
        // if(scrollLeft >= lastCenter){
        //     next = Math.floor((scrollLeft-lastCenter-halfWindow)/84);
        // } else{
        //    next = Math.floor(scrollLeft-halfWindow/84);
        // }

        var i = -1;
        var offset = 375/2 - 60;
        while(i++ <= len){
            // 绘制激活项之前部分
            if(i <= next){
                if(i === next){
                    ctx.drawImage(drawItem(1), 20 * (i + 1) + 64 * i + scrollLeft + offset, 40, w, h);
                    continue;
                }
                if(i === pre){
                    ctx.drawImage(drawItem(1), 20 * (i + 1) + 64 * i + scrollLeft + offset, 40, w, h);
                    continue;
                }
                ctx.drawImage(drawItem(0.8), 20 * (i + 1) + 64 * i + scrollLeft + offset, 64, w, h);
            } else{
                if(i === pre){
                    ctx.drawImage(drawItem(1), 20 * (i + 1) + 64 * i + scrollLeft + offset, 40, w, h);
                    continue;
                }
                ctx.drawImage(drawItem(0.8), 20 * (i + 1) + 64 * i + scrollLeft + offset + 16, 64, w, h);
            }
        }
    }

    function drawList2(last, len, count, step){
        var active = last - Math.floor(step / 84);
        current = active;
        var scrollStep = (step / 18) * count;
        var stamp = 0.2 / 18;

        ctx.clearRect(-1000, -1000, 10000, 10000);
        var i = 1;
        while(i <= len){
            if(i <= active){
                if(i == last) {
                    ctx.drawImage(drawItem(1 - stamp * count), 20 * i - 16 * (i - 1) + 80 * (i - 1) + scrollStep + scrollLeft, 40 + count * (24/18), w, h);
                    i++;
                    continue;
                }

                let leftStep = last < active && i > last ? 16 - (16/18) * count : 0;
                if(i == active) {
                    ctx.drawImage(drawItem(0.8 + stamp * count), 20 * active + 64 * (active - 1) + leftStep + scrollStep + scrollLeft, 64 - count * (24/18), w, h);
                } else{
                    ctx.drawImage(drawItem(0.8), 20 * i - 16 * (i - 1) + 80 * (i - 1) + leftStep + scrollStep + scrollLeft, 40 + 24, w, h);
                }
            } else{
                let leftStep = last > active && i > active && i <= last ? -(16/18) * (18 - count) : 0;
                if(i == last) {
                    ctx.drawImage(drawItem(1 - stamp * count), 20 * i - 16 * (i - 2) + 80 * (i - 1) + leftStep + scrollStep + scrollLeft, 40 + count * (24/18), w, h);
                    i++;
                    continue;
                }

                ctx.drawImage(drawItem(0.8), 20 * i - 16 * (i - 2) + 80 * (i - 1) + leftStep + scrollStep + scrollLeft, 40 + 24, w, h);
            }
            i++;
        }
    }

    function drawItem(scale){
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;

        var ctx = canvas.getContext('2d');
        scale = typeof scale === 'number' ? scale : 1;
        ctx.scale(scale, scale);
        ctx.fillStyle = '#999';
        ctx.fillRect(0, 0, w, h);
        return canvas;
    }
})()