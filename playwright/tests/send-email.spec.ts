import { test, expect } from '@playwright/test';

test('send email', async ({ page }) => {
  await page.goto('https://html-mail.top/html-mail/');
  // 点击 开始使用按钮
  await page.getByRole('button', { name: '开始使用' }).click();

  // 输入邮箱
  await page.getByPlaceholder('请输入收件人邮箱').fill('chenxiangbj@kanyun.com');

  // 点击 发送邮件
  await page.getByRole('button', { name: '发送邮件' }).click();
  await expect(page.getByText('邮件发送成功！')).toBeVisible();
});
