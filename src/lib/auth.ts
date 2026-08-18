/**
 * 管理后台简单密码鉴权
 * 单密码模式：通过环境变量 ADMIN_PASSWORD 配置
 */
export function verifyAdminPassword(request: Request): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'morpho2026';
  const provided = request.headers.get('x-admin-password');
  return !!provided && provided === adminPassword;
}
