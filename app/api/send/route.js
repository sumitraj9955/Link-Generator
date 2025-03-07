import { EmailTemplate } from '@/app/_components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const responce=await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: 'ankitaraj@resend.dev',
      to: ['rajankita098@gmail.com'],
      subject: responce?.userName+"shared image",
      react: EmailTemplate({  responce }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
