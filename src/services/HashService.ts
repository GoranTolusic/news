import { Service } from "typedi";
import * as bcrypt from 'bcrypt';

@Service()
class HashService {
  async hash(string: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(string, salt)
  }

  async comparePasswords(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }
}

export default HashService;