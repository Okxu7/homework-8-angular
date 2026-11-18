import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  // ================= ЗАВДАННЯ 1 =================
  user = { email: '', password: '' };
  submittedData: any = null;

  onSubmit() {
    this.submittedData = { ...this.user };
    console.log('Дані з форми (Завдання 1):', this.submittedData);
  }

  // ================= ЗАВДАННЯ 2 =================
  reactiveForm!: FormGroup;
  reactiveSubmittedData: any = null;

  // ================= ЗАВДАННЯ 3 =================
  task3Form!: FormGroup;
  task3SubmittedData: any = null;

  // Ін'єктуємо FormBuilder через конструктор
  constructor(private fb: FormBuilder) {}

  // Один спільний ngOnInit для ініціалізації обох реактивних форм
  ngOnInit(): void {
    // Ініціалізація Завдання 2
    this.reactiveForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    // Ініціалізація Завдання 3 (через FormBuilder)
    this.task3Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      agreeToTerms: [false, Validators.requiredTrue], // Чекбокс
      hobbies: this.fb.array([]) // Масив захоплень
    });
  }

  // Метод для Завдання 2
  onSubmitReactive(): void {
    if (this.reactiveForm.valid) {
      this.reactiveSubmittedData = this.reactiveForm.value;
      console.log('Дані з реактивної форми (Завдання 2):', this.reactiveSubmittedData);
    } else {
      this.reactiveForm.markAllAsTouched();
    }
  }

  // --- МЕТОДИ ДЛЯ ЗАВДАННЯ 3 ---
  get hobbies(): FormArray {
    return this.task3Form.get('hobbies') as FormArray;
  }

  addHobby(): void {
    this.hobbies.push(this.fb.control(''));
  }

  // onSubmitTask3(): void {
  //   if (this.task3Form.valid) {
  //     this.task3SubmittedData = this.task3Form.value;
  //     console.log('Дані Завдання 3:', this.task3SubmittedData);
  //   } else {
  //     this.task3Form.markAllAsTouched();
  //   }
  // }

onSubmitTask3(): void {
    if (this.task3Form.valid) {
      // 1. Зберігаємо дані для виведення на екран
      this.task3SubmittedData = this.task3Form.value;
      console.log('Дані Завдання 3 та 4:', this.task3SubmittedData);

      // 2. Видаляємо всі додані поля захоплень (FormArray)
      this.hobbies.clear();

      // 3. Очищаємо форму до початкового стану (скидаємо значення та стани touched/dirty)
      this.task3Form.reset({
        email: '',
        password: '',
        agreeToTerms: false
      });
    } else {
      this.task3Form.markAllAsTouched();
    }
  }


}



