import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  // ── Form ──
  loginForm: FormGroup;

  // ── UI State ──
  isLoading = false;
  showPassword = false;
  isDarkMode = true;
  showErrorBanner = false;
  errorMessage = 'Invalid username or password. Please try again.';

  // ── Star elements for cleanup ──
  private stars: HTMLElement[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // ─────────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────────

  ngOnInit(): void {
    this.applyTheme(this.isDarkMode);
    this.generateStarfield();

    // Clear error banner as soon as user types anything
    this.loginForm.valueChanges.subscribe(() => {
      if (this.showErrorBanner) {
        this.showErrorBanner = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.stars.forEach(s => s.remove());
    this.stars = [];
  }

  // ─────────────────────────────────────────────
  // FORM SUBMIT
  // ─────────────────────────────────────────────

  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.showErrorBanner = false;

    const { username, password } = this.loginForm.value;

    // ── Replace fakeAuthCall() with your real AuthService ──
    this.fakeAuthCall(username, password).then(success => {
      this.isLoading = false;

      if (success) {
        this.router.navigate(['/dashboard']);   // ← update route
      } else {
        this.showErrorBanner = true;
        this.loginForm.get('password')?.reset();
      }
    });
  }

  // ─────────────────────────────────────────────
  // FORM FIELD GETTERS
  // ─────────────────────────────────────────────

  get usernameCtrl() { return this.loginForm.get('username')!; }
  get passwordCtrl() { return this.loginForm.get('password')!; }

  get usernameError(): string {
    const c = this.usernameCtrl;
    if (c.touched && c.hasError('required')) return 'Username is required.';
    if (c.touched && c.hasError('minlength')) return 'Username must be at least 3 characters.';
    return '';
  }

  get passwordError(): string {
    const c = this.passwordCtrl;
    if (c.touched && c.hasError('required')) return 'Password is required.';
    if (c.touched && c.hasError('minlength')) return 'Password must be at least 6 characters.';
    return '';
  }

  // ─────────────────────────────────────────────
  // PASSWORD VISIBILITY
  // ─────────────────────────────────────────────

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // ─────────────────────────────────────────────
  // THEME TOGGLE
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
  // SOCIAL LOGIN
  // ─────────────────────────────────────────────

  loginWithGoogle(): void {
    // TODO: inject GoogleAuthService and call here
    console.log('Google login clicked');
  }

  loginWithGitHub(): void {
    // TODO: inject GitHubAuthService and call here
    console.log('GitHub login clicked');
  }

  // ─────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);  // ← update route
  }

  onCreateAccount(): void {
    this.router.navigate(['/register']);          // ← update route
  }

  // ─────────────────────────────────────────────
  // STARFIELD GENERATOR
  // ─────────────────────────────────────────────

  private generateStarfield(): void {
    const container = document.getElementById('starfield');
    if (!container) return;

    for (let i = 0; i < 55; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const sz = (Math.random() * 1.4 + 0.5).toFixed(1);
      star.style.cssText =
        `width:${sz}px; height:${sz}px;` +
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

  private fakeAuthCall(
    username: string,
    password: string
  ): Promise<boolean> {
    return new Promise(resolve =>
      setTimeout(() =>
        resolve(username === 'admin' && password === 'password123'), 1800)
    );
  }
}