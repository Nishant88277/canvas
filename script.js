let lock_left = true, lock_top = true, lock_right = true, lock_bottom = true, d;

let avatar, avatars;

let avatar_x = 0, avatar_y = 0;

const map_main =
    {
        update: function () {
            document.querySelector("body").style.width = "500px";
            document.querySelector("body").style.height = "450px";
            document.querySelector("body").style.position = "relative";
            document.querySelector("body").style.top = "70px";
            document.querySelector("body").style.left = "70px";
        }
    };

const map_avatar = {
        create: function () {
            avatar = document.createElement("div");
            avatar.setAttribute("id", "test");
            avatars = avatar.style;
            document.querySelector("body").appendChild(avatar)
        },

        update: function () {
            avatars.width = "15px";
            avatars.height = "24px";
            avatars.background = "url('triangle.png')";
            avatars.backgroundSize = "cover";
            avatars.position = "absolute";
            avatars.bottom = avatar_y + "px";
            avatars.right = avatar_x + "px";
            avatars.backgroundRepeat = "no-repeat";
        },
    };

const master_create = function () {
    map_avatar.create();
    document.getElementById('test').style.cssText = 'transform: rotate(270deg);';
    document.querySelector("body").addEventListener("keyup", movement, true);
};

const master_update = function () {
    map_main.update();
    map_avatar.update();

    window.requestAnimationFrame(master_update)
};

const press = function (pressed){
    let element = document.getElementById('test'),
        style = window.getComputedStyle(element),
        transform = style.getPropertyValue('transform');
    if ((pressed.keyCode === 77) && (transform === "matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)")) {
        lock_top = false;
        d = "north";
        document.getElementById('position').innerHTML = d.toUpperCase();
    }
    if ((pressed.keyCode === 77) && (transform === "matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)")) {
        lock_bottom = false;
        d = "south";
        document.getElementById('position').innerHTML = d.toUpperCase();
    }
    if ((pressed.keyCode === 77) && (transform === "matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)")) {
        lock_left = false;
        d = "west";
        document.getElementById('position').innerHTML = d.toUpperCase();
    }
    if ((pressed.keyCode === 77) && (transform === "matrix(1, 0, 0, 1, 0, 0)")) {
        lock_right = false;
        d = "east";
        document.getElementById('position').innerHTML = d.toUpperCase();
    }
};

function reverseArray(array) {
    for (let i = 0, j = array.length - 1; i < j; i++, j--)
        [array[i], array[j]] = [array[j], array[i]];
}

let x = 0, y = 0;
let right = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], left = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let count;

const movement = function (create) {
    let posTop = window.scrollY + document.querySelector('#test').getBoundingClientRect().top;
    let posLeft = window.scrollX + document.querySelector('#test').getBoundingClientRect().left;
    let posRight = window.scrollX + document.querySelector('#test').getBoundingClientRect().right;
    let posBottom = window.scrollX + document.querySelector('#test').getBoundingClientRect().bottom;
    if ((create.keyCode === 77)) {
        if (d === "north") {
            x++;
            count = x;
            document.getElementById("x-co").innerHTML = x;
            if (x > 9) {
                count = right.unshift(x);
                count = right.pop();
            }
        } else if ((d === "south")) {
            (x > 0) ? x-- : null;
            countUp = x + 1;
            countDown = x - 9;
            if (countDown > -1) {
                count = right.push(countDown);
                count = right.shift();
            }
            document.getElementById("x-co").innerHTML = x;
            if (lock_bottom === false) {
                if (!(posBottom === 523.5) && (d === "south") && (countUp < 10)) {
                    avatar_y -= 50;
                }
            }
        }
        let rightStr = '<ul class="left-ul">';
        right.forEach(function (slide) {
            rightStr += '<li>' + slide + '</li>';
        });

        rightStr += '</ul>';
        document.getElementById("right").innerHTML = rightStr;

        if (d === "west") {
            y++;
            count = y;
            document.getElementById("y-co").innerHTML = y;
            if (y > 9) {
                count = left.unshift(y);
                count = left.pop();
            }
        } else if ((d === "east")) {
            (y > 0) ? y-- : null;
            countUp = y + 1;
            countDown = y - 9;
            if (countDown > -1) {
                count = left.push(countDown);
                count = left.shift();
            }
            document.getElementById("y-co").innerHTML = y;
            if (lock_right === false) {
                if (!(posRight === 578) && (d === "east") && (countUp < 10)) {
                    avatar_x -= 49;
                }
            }
        }

        let leftStr = '<ul class="right-ul">';
        left.forEach(function (slide) {
            leftStr += '<li>' + slide + '</li>';
        });

        leftStr += '</ul>';
        document.getElementById("left").innerHTML = leftStr;

    }

    if (lock_left === false) (!(posLeft === 122) && (d === "west")) ? avatar_x += 49 : null;
    if (lock_top === false) (!(posTop === 58.5) && (d === "north")) ? avatar_y += 50 : null;

};
const show = function (event) {
    let k = event.keyCode;
    let element = document.getElementById('test'),
        style = window.getComputedStyle(element),
        transform = style.getPropertyValue('transform');
    if (k === 76) document.getElementById('test').style.cssText = 'transform: rotate(180deg);';
    else if (k === 82) document.getElementById('test').style.cssText = 'transform: rotate(0deg);';
    if (transform === "matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)") {
        d = "west";
        lock_left = true;
        if (k === 76){
            document.getElementById('test').style.cssText = 'transform: rotate(90deg);';
            document.getElementById('position').innerHTML = 'SOUTH';
        }
        else if (k === 82){
            document.getElementById('test').style.cssText = 'transform: rotate(270deg);';
            document.getElementById('position').innerHTML = 'NORTH';
        }
    }
    if ((transform === "matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)")) {
        d = "north";
        lock_top = true;
        if (k === 76){
            document.getElementById('test').style.cssText = 'transform: rotate(180deg);';
            document.getElementById('position').innerHTML = 'WEST';
        }
        if (k === 82){
            document.getElementById('test').style.cssText = 'transform: rotate(0deg);';
            document.getElementById('position').innerHTML = 'EAST';
        }
    }
    if (transform === "matrix(1, 0, 0, 1, 0, 0)") {
        d = "east";
        lock_right = true;
        if (k === 76){
            document.getElementById('test').style.cssText = 'transform: rotate(270deg);';
            document.getElementById('position').innerHTML = 'NORTH';
        }
        else if (k === 82){
            document.getElementById('position').innerHTML = 'SOUTH';
            document.getElementById('test').style.cssText = 'transform: rotate(90deg);';
        }
    }
    if ((transform === "matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)")) {
        d = "south";
        lock_bottom = true;
        if (k === 76){
            document.getElementById('test').style.cssText = 'transform: rotate(0deg);';
            document.getElementById('position').innerHTML = 'EAST';
        }
        if (k === 82){
            document.getElementById('position').innerHTML = 'WEST';
            document.getElementById('test').style.cssText = 'transform: rotate(180deg);';
        }
    }
};

master_create();
master_update();

document.querySelector("body").addEventListener("keydown", press, false);
document.querySelector("body").addEventListener("keyup", show, false);

reverseArray(right);
let rightStr = '<ul class="left-ul">';
right.forEach(function (slide) {
    rightStr += '<li>' + slide + '</li>';
});

rightStr += '</ul>';
document.getElementById("right").innerHTML = rightStr;

reverseArray(left);
let leftStr = '<ul class="right-ul">';
left.forEach(function (slide) {
    leftStr += '<li>' + slide + '</li>';
});

leftStr += '</ul>';
document.getElementById("left").innerHTML = leftStr;

const input = () => {
    let input = document.getElementById('char');
    let division = document.getElementById('char-div');
    division.innerHTML = input.value;
};
