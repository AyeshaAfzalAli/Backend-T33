// data.ts

export const users = Array.from({ length: 40 }, (_, i) => ({
  name: `User${i + 1}`,
  email: `user${i + 1}@example.com`,
  password: `hashed_password_${i + 1}`,
  role: ['volunteer', 'employee', 'admin'][i % 3],
  createdAt: new Date(),
  updatedAt: new Date()
}));

export const persons = Array.from({ length: 40 }, (_, i) => {
  const gender = i % 2 === 0 ? 'Female' : 'Male';
  const statusOptions = ['outreach', 'trafficked', 'rescued', 'empowered', 'reintegrated'];
  const historyCount = Math.floor(Math.random() * 3) + 1;

  return {
    name: `Person${i + 1}`,
    dob: `199${i % 10}-0${(i % 12) + 1}-15`,
    gender,
    contact: `98765432${(10 + i) % 100}`,
    address: `Address ${i + 1}, Street No ${(i % 10) + 1}, City${i % 5}`,
    code: i % 2 === 0 ? 'women' : 'child',
    statusHistory: Array.from({ length: historyCount }, (_, j) => ({
      status: statusOptions[j],
      date: new Date(2023, j % 12, (j + 1) * 2),
      batch: {
        year: 2023 + (j % 2),
        quarter: ((j % 4) + 1)
      }
    })),
    createdBy: `User${(i % 10) + 1}`,
    assignedTo: `User${(i % 10) + 2}`,
    messages: [`Initial record for Person${i + 1}`, `Follow-up for Person${i + 1}`],
    createdAt: new Date(),
    updatedAt: new Date()
  };
});
