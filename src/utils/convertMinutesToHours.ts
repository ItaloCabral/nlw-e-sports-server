// 600 => 10:00

export const convertMinutesToHours = (time: number) => {
  const hours = ~~(time / 60);
  const minutes = time % 60;

  return [hours, minutes].map(unit => String(unit).padStart(2, '0')).join(':');
}
