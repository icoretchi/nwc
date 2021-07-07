export interface ExistsByEmailPort {
  existsByEmail(email: string): Promise<boolean>;
}

export const EXISTS_BY_EMAIL_PORT = Symbol('EXISTS_BY_EMAIL_PORT');
