import Image from "next/image";
import { getProfile, urlFor } from "@/lib/sanity";
import type { Metadata } from "next";
import type { Experience } from "@/types/blog";

export const metadata: Metadata = {
  title: "プロフィール - New Vibes",
  description: "New Vibesの運営者プロフィールページです。",
};

export const revalidate = 0;

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">プロフィール</h1>
          <p className="text-gray-600">プロフィール情報が設定されていません。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-50 to-white p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {profile.profileImage && (
              <div className="w-48 h-48 relative flex-shrink-0">
                <Image
                  src={urlFor(profile.profileImage).width(300).height(300).url()}
                  alt={profile.profileImage.alt || profile.name || "Profile"}
                  fill
                  className="rounded-full object-cover shadow-lg"
                  priority
                />
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {profile.name}
              </h1>
              {profile.catchphrase && (
                <p className="text-xl text-primary-600 font-medium mb-4">
                  {profile.catchphrase}
                </p>
              )}
              {profile.bio && (
                <p className="text-gray-700 leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="p-8 md:p-12">
          {profile.contactEmail && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">お問い合わせ</h2>
              <a 
                href={`mailto:${profile.contactEmail}`}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                メールでお問い合わせ
              </a>
            </div>
          )}

          {/* Skills Section */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">スキル</h2>
              <div className="flex flex-wrap gap-3">
                {profile.skills.map((skill: string, index: number) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience Section */}
          {profile.experience && profile.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">経歴・実績</h2>
              <div className="space-y-6">
                {profile.experience.map((exp: Experience, index: number) => (
                  <div key={index} className="border-l-4 border-primary-200 pl-6 pb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {exp.position}
                    </h3>
                    <p className="text-primary-600 font-medium mb-2">
                      {exp.company}
                    </p>
                    <p className="text-gray-500 text-sm mb-3">
                      {exp.period}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links Section */}
          {profile.socialLinks && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">SNS</h2>
              <div className="flex flex-wrap gap-4">
                {profile.socialLinks.twitter && (
                  <a 
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    𝕏
                  </a>
                )}
                {profile.socialLinks.instagram && (
                  <a 
                    href={profile.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 16.988c-2.508 0-4.541-2.033-4.541-4.54s2.033-4.541 4.541-4.541c2.508 0 4.541 2.033 4.541 4.541s-2.033 4.54-4.541 4.54zm7.119 0c-2.508 0-4.541-2.033-4.541-4.54s2.033-4.541 4.541-4.541c2.508 0 4.541 2.033 4.541 4.541s-2.033 4.54-4.541 4.54z" />
                    </svg>
                    Instagram
                  </a>
                )}
                {profile.socialLinks.youtube && (
                  <a 
                    href={profile.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    YouTube
                  </a>
                )}
                {profile.socialLinks.github && (
                  <a 
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {profile.socialLinks.linkedin && (
                  <a 
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}