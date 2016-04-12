function timerFilter() {
  return (input) => {
    if (!input) return '';

    const time = [
      Math.floor(input / 3600000),
      Math.floor(input / 60000 % 60),
      Math.floor(input / 1000 % 60),
    ];

    for (let i = time.length - 1; i !== 0; i--) {
      const t = time[i].toString();
      time[i] = t.length !== 2 ? `0${t}` : t;
    }

    return time.join(':');
  };
}

export { timerFilter };
