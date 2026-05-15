import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  // ── Form ──
  loginForm: FormGroup;

  // ── UI State ──
  loading = false;
  showPassword = false;
  error = '';

  // ── Theme ──
  isDarkMode = true;

  // ── Cleanup ──
  private stars: HTMLElement[] = [];
  private formSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6),this.shouldContain]]
    });
  }

  // ─────────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────────

  ngOnInit(): void {
    this.applyTheme(this.isDarkMode);
    this.generateStarfield();

    // Clear error as soon as user types
    this.formSub = this.loginForm.valueChanges.subscribe(() => {
      if (this.error) {
        this.error = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.formSub?.unsubscribe();

    this.stars.forEach(star => star.remove());
    this.stars = [];
  }

  // ─────────────────────────────────────────────
  // FORM SUBMIT
  // ─────────────────────────────────────────────

  onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const { username, password } = this.loginForm.value;

    

    // Replace this fakeAuthCall() with your real AuthService later
    this.fakeAuthCall(username, password).then(success => {
      this.loading = false;

      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Invalid username or password. Please try again.';
        this.loginForm.get('password')?.reset();
      }
    });
  }

  // ─────────────────────────────────────────────
  // FORM FIELD GETTERS
  // ─────────────────────────────────────────────

  shouldContain(control:AbstractControl):ValidationErrors|null{
    let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    return regex.test(control.value)?null:{invalidPass:true};
  }
  get usernameCtrl() {
    return this.loginForm.get('username')!;
  }

  get passwordCtrl() {
    return this.loginForm.get('password')!;
  }

  get usernameError(): string {
    const control = this.usernameCtrl;

    if (control.touched && control.hasError('required')) {
      return 'Username is required';
    }

    if (control.touched && control.hasError('minlength')) {
      return 'Username must be at least 3 characters';
    }

    return '';
  }

  get passwordError(): string {
    const control = this.passwordCtrl;

    if (control.touched && control.hasError('required')) {
      return 'Password is required';
    }

    if (control.touched && control.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    
    if(control.touched && control.hasError('invalidPass')){
      return 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number.';
    }

    return '';
  }

  // ─────────────────────────────────────────────
  // PASSWORD VISIBILITY
  // ─────────────────────────────────────────────

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // ─────────────────────────────────────────────
  // THEME
  // ─────────────────────────────────────────────

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme(this.isDarkMode);
  }

  private applyTheme(dark: boolean): void {
    document.documentElement.setAttribute(
      'data-theme',
      dark ? 'dark' : 'light'
    );
  }

  // ─────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  onCreateAccount(): void {
    this.router.navigate(['/register']);
  }

  // ─────────────────────────────────────────────
  // STARFIELD GENERATOR
  // ─────────────────────────────────────────────

  private generateStarfield(): void {
    const container = document.getElementById('starfield');

    if (!container) {
      return;
    }

    for (let i = 0; i < 55; i++) {
      const star = document.createElement('div');

      star.className = 'star';

      const size = (Math.random() * 1.4 + 0.5).toFixed(1);

      star.style.cssText =
        `width:${size}px; height:${size}px;` +
        `top:${(Math.random() * 100).toFixed(1)}%;` +
        `left:${(Math.random() * 100).toFixed(1)}%;` +
        `--dur:${(Math.random() * 4 + 3).toFixed(1)}s;` +
        `--delay:${(Math.random() * 4).toFixed(1)}s;` +
        `--min-op:${(Math.random() * 0.1).toFixed(2)};` +
        `--max-op:${(Math.random() * 0.35 + 0.15).toFixed(2)};`;

      container.appendChild(star);
      this.stars.push(star);
    }
  }

  // ─────────────────────────────────────────────
  // FAKE AUTH — replace with real AuthService
  // ─────────────────────────────────────────────

  private fakeAuthCall(username: string, password: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(username === 'admin' && password === 'password123');
      }, 1800);
    });
  }
}