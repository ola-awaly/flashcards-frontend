import { getCurrentUser } from '../apis/security';

export function rootLaoder() {
	return getCurrentUser();
}
