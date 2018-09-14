// 获取元素
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
// data-time 数组用来储存我们的时间数据
const buttons = document.querySelectorAll('[data-time]');
let countdown;

function timer(seconds) {
    // 清除上一次的计时器
    clearInterval(countdown);
    // 获取现在的时间
    const now = Date.now();
    // 现在的时间获取的是毫秒数所以要加上秒数*1000 计算多少毫秒后结束倒计时
    const then = now + seconds * 1000;
    displayEndTime(then);
    displayTimeLeft(seconds);

    // 用于清除上一个定时器的方法
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it!
        if (secondsLeft < 0) {
          clearInterval(countdown);
          return;
        }
        // display it
        displayTimeLeft(secondsLeft);
      }, 1000);

}

function displayTimeLeft(seconds) {
    // 计算分钟
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    // 计算结束的时间 如果小于10 则在前面加一个0
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
    document.title = display;
    // 计算后的时间的显示
    timerDisplay.textContent = display;
}

function displayEndTime(then) {
    // 计算结束的时间
    const end = new Date(then);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    // 如果小于10 则在前面加一个0
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}


// 鼠标点击开始的时间
function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);

    // 获取所点击到的秒数
    // console.log(seconds);
}

// 遍历button 实现方法
buttons.forEach(button => button.addEventListener('click', startTimer));
// 实现输入框数字的监听
document.customForm.addEventListener('submit', function (e) {
    // 防止浏览器刷新
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
  });