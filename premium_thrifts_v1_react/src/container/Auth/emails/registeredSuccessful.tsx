import React from 'react';

interface RegistrationSuccessEmailProps {
  name: string;
  verificationUrl?: string;
}

const RegistrationSuccessEmail: React.FC<RegistrationSuccessEmailProps> = ({
  name,
  verificationUrl,
}) => {

  //get first name
  const spaceIndex = name.indexOf(" ");
  name = name.substring(0, spaceIndex);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
    }}>
      <table style={{ width: '100%', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <tr>
          <td style={{ padding: '40px 20px', textAlign: 'center' as const }}>
            <img 
              src="/image.png" 
              alt="PremiumHub " 
              style={{ width: '120px', marginBottom: '20px' }} 
            />
            
            <h1 style={{ 
              color: '#1A1F2C',
              fontSize: '24px',
              marginBottom: '20px',
              fontWeight: 600,
            }}>
              Welcome to PremiumHub!
            </h1>
            
            <p style={{ 
              color: '#8E9196',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '30px',
            }}>
              Hi {name}, thank you for joining PremiumHub! We're excited to have you as part of our community.
            </p>

            {verificationUrl && (
              <div style={{ marginBottom: '30px' }}>
                <a 
                  href={verificationUrl}
                  style={{
                    backgroundColor: '#9b87f5',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    display: 'inline-block',
                  }}
                >
                  Verify Your Email
                </a>
              </div>
            )}

            <div style={{
              borderTop: '1px solid #E5DEFF',
              paddingTop: '20px',
              marginTop: '20px',
            }}>
              <p style={{ 
                color: '#8E9196',
                fontSize: '14px',
                lineHeight: '20px',
              }}>
                If you have any questions, please don't hesitate to contact our support team.
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default RegistrationSuccessEmail;

