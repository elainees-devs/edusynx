// server/repositories/super-admin.login.repository.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SuperAdminModel } from '../models/super-admin.model';
import { Types } from 'mongoose';
import { ILoginRequest, ILoginResponse } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class SuperAdminRepository {
  async login(payload: ILoginRequest): Promise<ILoginResponse> {
    const { email, password, ipAddress, deviceInfo, rememberMe } = payload;

    const user = await SuperAdminModel.findOne({ email });
    if (!user) {
      return { success: false, message: 'Super Admin not found'};
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid Credentials' };
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        ipAddress,
        deviceInfo,
      },
      JWT_SECRET,
      {
        expiresIn: rememberMe ? '7d' : '1d',
      }
    );

    console.log(`[LOGIN] ${email} from ${ipAddress || 'unknown IP'} using ${deviceInfo || 'unknown device'}`);

    return {
      success: true,
      message: 'Login Successful',
      token,
      user: {
        id: user._id as Types.ObjectId,
        email: user.email,
        role: user.role,
      },
    };
  }
}

