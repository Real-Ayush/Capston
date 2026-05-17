import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  errorMessage = '';
  successMessage = '';
  loading = false;

  // ✅ ADD THESE (MISSING VARIABLES)
  otpSent: boolean = false;
  otp: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['CUSTOMER', [Validators.required]]
    });
  }

  onSubmit(): void {

    if (this.registerForm.invalid) return;

    this.errorMessage = '';
    this.successMessage = '';

    // ✅ STEP 1: SEND OTP
    if (!this.otpSent) {

      this.loading = true;

      this.auth.sendOtp(this.registerForm.value.email)
        .subscribe({
          next: () => {
            this.loading = false;
            this.otpSent = true;
            this.successMessage = 'OTP sent to your email ✅';
          },
          error: (err) => {
            this.loading = false;
            this.errorMessage = err.error?.message || 'Failed to send OTP';
          }
        });

    }

    // ✅ STEP 2: VERIFY OTP + REGISTER
    else {

      if (!this.otp) {
        this.errorMessage = 'Please enter OTP';
        return;
      }

      this.loading = true;

      const payload = {
        ...this.registerForm.value,
        otp: this.otp
      };

      this.auth.verifyOtpAndRegister(payload)
        .subscribe({
          next: () => {
            this.loading = false;
            this.successMessage = 'Registered successfully ✅';

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500);
          },
          error: (err) => {
            this.loading = false;
            this.errorMessage = err.error?.message || 'Invalid OTP ❌';
          }
        });
    }
  }
}