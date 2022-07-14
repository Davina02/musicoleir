import bcrypt from 'bcrypt';

export class Encryption {

  static BCRYPT_ROUNDS: number = 10;

  public static hash(string_to_hash: string, round: number = Encryption.BCRYPT_ROUNDS): string{
    return bcrypt.hashSync(string_to_hash, round);
  }

  public static compare(string_to_compare: string, hash: string): boolean {
      return bcrypt.compareSync(string_to_compare, hash);
  }
}

