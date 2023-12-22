
function clock() {
  setTimeout(() => {
    console.log(`${new Date().toTimeString()}`);
    clock();
  }, 1000);
}
setInterval(() => {
  console.log(`${new Date().toTimeString()}`);
});

