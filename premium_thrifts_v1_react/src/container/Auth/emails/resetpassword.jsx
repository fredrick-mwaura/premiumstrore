import React from 'react';

const PasswordResetEmail = ({ subject, otp, url }) => {
  return (
    <div className="w-full bg-[#f3f2f0] py-8 px-4">
      <div className="max-w-[600px] mx-auto bg-white border border-[#e8e7e5]">
        <div className="p-12">
          <h1 className="text-2xl font-bold text-left text-[#262626] font-sans mb-6">
            {subject},
          </h1>
          <p className="text-base text-left text-black font-sans leading-[1.5rem] mb-6">
            Here is your password reset otp <strong>{otp}</strong>
          </p>
          <p className="text-base text-left text-black font-sans leading-[1.5rem] mb-6">
            Use this URL to reset your password: <a href={url} className="text-blue-600 underline">{url}</a>
          </p>
          <p className="text-base text-left text-black font-sans leading-[1.5rem] mt-12">
            Best Regards,<br />
            {process.env.APP_NAME || 'YourAppName'}<br />
          </p>
        </div>

        <div className="bg-[#f3f2f0] px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center">
            <p className="text-sm text-[#787777] text-left">qeria.com &copy; 2024</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/1f9161ee-46b5-4bdf-86db-9e32d4b98336.jpg"
                  alt="facebook"
                  className="w-9 h-9"
                />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/4e449140-ec71-4978-97bf-8e0f15b5ff23.jpg"
                  alt="twitter"
                  className="w-9 h-9"
                />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/d21cca91-335e-4fa4-9313-b0ea37e0452b.jpg"
                  alt="linkedin"
                  className="w-9 h-9"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetEmail;