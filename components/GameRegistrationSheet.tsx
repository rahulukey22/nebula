import { toast } from 'sonner@2.0.3';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { ChevronLeft, CheckCircle2, Ticket, Mail, User, Loader2, Gift, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { brand } from '../config/brand';

export type GameType = 'lucky-draw' | 'scratch-card' | 'spin-wheel' | 'referral' | 'milestone';

interface GameRegistrationSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  gameType: GameType;
  rewardDescription: string;
  onSuccess: (result: string[]) => void;
  customerPhone?: string;
  /** If false, parent handles closing after success. Default true. */
  autoCloseOnSuccess?: boolean;
}

type Step = 'profile' | 'otp' | 'success';

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  ageGroup: string;
  email: string;
  maritalStatus: string;
}

const GAME_CONFIG: Record<GameType, {
  badge: string;
  profileTitle: string;
  profileSubtitle: (desc: string) => string;
  successTitle: string;
  rewardLabel: string;
  idPrefix: string;
}> = {
  'lucky-draw': {
    badge: 'Lucky Draw Registration',
    profileTitle: 'Join the Family',
    profileSubtitle: (d) => `Complete your profile to claim ${d}.`,
    successTitle: "You're In! \u{1F389}",
    rewardLabel: 'YOUR TICKET NUMBERS',
    idPrefix: 'TKT',
  },
  'scratch-card': {
    badge: 'Scratch Card Unlock',
    profileTitle: 'Unlock Your Card',
    profileSubtitle: (d) => `Complete your profile to claim ${d}.`,
    successTitle: 'Scratch Away! \u{1F3B4}',
    rewardLabel: 'YOUR SCRATCH CARDS',
    idPrefix: 'SCR',
  },
  'spin-wheel': {
    badge: 'Spin the Wheel',
    profileTitle: 'Ready to Spin?',
    profileSubtitle: (d) => `Register to spin and win ${d}.`,
    successTitle: 'You Spun & Won! \u{1F3A1}',
    rewardLabel: 'YOUR SPIN REWARD',
    idPrefix: 'SPIN',
  },
  'referral': {
    badge: 'Referral Reward',
    profileTitle: 'Share the Love',
    profileSubtitle: () => 'Complete your profile to unlock your referral bonus.',
    successTitle: 'Referral Activated! \u{1F91D}',
    rewardLabel: 'YOUR REFERRAL CODE',
    idPrefix: 'REF',
  },
  'milestone': {
    badge: 'Milestone Unlocked',
    profileTitle: 'Claim Your Reward',
    profileSubtitle: (d) => `You've hit a milestone! Claim ${d}.`,
    successTitle: 'Milestone Achieved! \u{1F3C6}',
    rewardLabel: 'YOUR MILESTONE REWARD',
    idPrefix: 'MLT',
  },
};

export function GameRegistrationSheet({
  isOpen,
  onOpenChange,
  gameType,
  rewardDescription,
  onSuccess,
  customerPhone = '9876543210',
  autoCloseOnSuccess = true,
}: GameRegistrationSheetProps) {
  const [step, setStep] = useState<Step>('profile');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    gender: '',
    ageGroup: '',
    email: '',
    maritalStatus: '',
  });
  const [otp, setOtp] = useState('');
  const [generatedRewards, setGeneratedRewards] = useState<string[]>([]);

  const config = GAME_CONFIG[gameType];

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep('profile');
        setLoading(false);
        setFormData({ firstName: '', lastName: '', gender: '', ageGroup: '', email: '', maritalStatus: '' });
        setOtp('');
        setGeneratedRewards([]);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleProfileSubmit = () => {
    const { firstName, lastName, gender, ageGroup, email, maritalStatus } = formData;
    if (!firstName || !lastName || !gender || !ageGroup || !email || !maritalStatus) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('OTP sent successfully! Use code: 000000', {
        description: 'Enter the OTP code to verify your registration',
        duration: 5000,
      });
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = () => {
    if (otp.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === '000000') {
        // Parse count from rewardDescription (e.g. "2 Lucky Draw Tickets")
        const countMatch = rewardDescription.match(/^(\d+)/);
        const count = countMatch ? parseInt(countMatch[1]) : 1;
        const prefix = gameType === 'referral'
          ? `REF-${formData.firstName.toUpperCase()}`
          : config.idPrefix;
        const ids = Array(count).fill(0).map(() =>
          `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`
        );
        setGeneratedRewards(ids);
        setStep('success');
        onSuccess(ids);
        // Auto close after 2s if enabled
        if (autoCloseOnSuccess) {
          setTimeout(() => onOpenChange(false), 2000);
        }
      } else {
        toast.error('Invalid OTP. Use 000000 for testing.');
      }
    }, 1000);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 border-none overflow-y-auto"
        style={{ zIndex: 200, backgroundColor: brand.colors.background.secondary }}
      >
        <SheetTitle className="sr-only">{config.badge}</SheetTitle>
        <SheetDescription className="sr-only">{config.profileSubtitle(rewardDescription)}</SheetDescription>

        {/* Header */}
        <div className="px-6 pt-12 pb-6">
          <div className="flex items-center gap-2 mb-4">
            {step === 'otp' && (
              <button
                onClick={() => setStep('profile')}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" style={{ color: brand.colors.text.primary }} />
              </button>
            )}
            <div
              className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                backgroundColor: `${brand.colors.primary}15`,
                color: brand.colors.primary,
              }}
            >
              {step === 'success' ? 'Confirmation' : config.badge}
            </div>
          </div>
          <h2
            className="text-3xl font-bold mb-1"
            style={{ color: brand.colors.primaryDark }}
          >
            {step === 'profile' && config.profileTitle}
            {step === 'otp' && 'Verify Details'}
            {step === 'success' && config.successTitle}
          </h2>
          <p style={{ color: brand.colors.text.secondary }} className="text-sm">
            {step === 'profile' && config.profileSubtitle(rewardDescription)}
            {step === 'otp' && `Enter the code sent to ${formData.email}`}
            {step === 'success' && `You've successfully claimed ${rewardDescription}.`}
          </p>
        </div>

        {/* Step Content */}
        <div className="px-6 pb-8">
          <AnimatePresence mode="wait">
            {/* ── STEP 1: PROFILE ── */}
            {step === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* Customer Phone - Read Only */}
                <div>
                  <Label className="text-xs mb-1.5 block" style={{ color: brand.colors.text.secondary }}>
                    Customer Number
                  </Label>
                  <div
                    className="flex items-center gap-3 px-4 h-12 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.5)',
                      border: `1px solid ${brand.colors.border.light}`,
                    }}
                  >
                    <User className="w-4 h-4" style={{ color: brand.colors.text.tertiary }} />
                    <span style={{ color: brand.colors.text.primary }}>+91 {customerPhone}</span>
                  </div>
                </div>

                {/* First + Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs mb-1.5 block" style={{ color: brand.colors.text.secondary }}>
                      First Name
                    </Label>
                    <Input
                      placeholder="Arya"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="bg-white border-none shadow-sm h-12"
                    />
                  </div>
                  <div>
                    <Label className="text-xs mb-1.5 block" style={{ color: brand.colors.text.secondary }}>
                      Last Name
                    </Label>
                    <Input
                      placeholder="Sharma"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="bg-white border-none shadow-sm h-12"
                    />
                  </div>
                </div>

                {/* Gender + Age Group */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs mb-1.5 block" style={{ color: brand.colors.text.secondary }}>
                      Gender
                    </Label>
                    <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                      <SelectTrigger className="bg-white border-none shadow-sm h-12">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs mb-1.5 block" style={{ color: brand.colors.text.secondary }}>
                      Age Group
                    </Label>
                    <Select value={formData.ageGroup} onValueChange={(v) => setFormData({ ...formData, ageGroup: v })}>
                      <SelectTrigger className="bg-white border-none shadow-sm h-12">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-24">18-24</SelectItem>
                        <SelectItem value="25-34">25-34</SelectItem>
                        <SelectItem value="35-44">35-44</SelectItem>
                        <SelectItem value="45-54">45-54</SelectItem>
                        <SelectItem value="55+">55+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label className="text-xs mb-1.5 block" style={{ color: brand.colors.text.secondary }}>
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    placeholder="arya@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white border-none shadow-sm h-12"
                  />
                </div>

                {/* Marital Status */}
                <div>
                  <Label className="text-xs mb-1.5 block" style={{ color: brand.colors.text.secondary }}>
                    Marital Status
                  </Label>
                  <Select value={formData.maritalStatus} onValueChange={(v) => setFormData({ ...formData, maritalStatus: v })}>
                    <SelectTrigger className="bg-white border-none shadow-sm h-12">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    onClick={handleProfileSubmit}
                    disabled={loading}
                    className="w-full h-14 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    style={{ backgroundColor: brand.colors.primary }}
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continue'}
                  </button>
                  <p className="text-xs text-center mt-3" style={{ color: brand.colors.text.tertiary }}>
                    By continuing, you agree to our Terms & Conditions
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: OTP ── */}
            {step === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col items-center"
              >
                {/* Mail icon */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${brand.colors.primary}0D` }}
                >
                  <Mail className="w-7 h-7" style={{ color: brand.colors.primary }} />
                </div>

                {/* OTP Input */}
                <div className="mb-6">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup className="gap-2">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="w-12 h-14 bg-white shadow-sm border-none ring-1 ring-black/5 text-lg rounded-lg"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {/* Resend */}
                <button
                  onClick={() => toast.info('Code resent!')}
                  className="text-sm font-medium mb-8"
                  style={{ color: brand.colors.primary }}
                >
                  Resend Code
                </button>

                {/* Verify Button */}
                <button
                  onClick={handleOtpSubmit}
                  disabled={loading || otp.length < 6}
                  className="w-full h-14 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: brand.colors.primary,
                    opacity: otp.length < 6 ? 0.7 : 1,
                  }}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Claim'}
                </button>
              </motion.div>
            )}

            {/* ── STEP 3: SUCCESS ── */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {/* Large Icon */}
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                  }}
                >
                  <Ticket className="w-10 h-10 text-white" />
                </div>

                {/* Reward Card */}
                <div
                  className="w-full rounded-2xl p-6 mb-6"
                  style={{
                    backgroundColor: 'white',
                    border: `1px solid ${brand.colors.border.light}`,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-4 text-center"
                    style={{ color: brand.colors.text.secondary }}
                  >
                    {config.rewardLabel}
                  </p>
                  <div className="space-y-2">
                    {generatedRewards.map((id) => (
                      <div
                        key={id}
                        className="flex items-center justify-between p-4 rounded-xl"
                        style={{ backgroundColor: brand.colors.background.tertiary }}
                      >
                        <span
                          className="font-mono text-lg font-bold"
                          style={{ color: brand.colors.primaryDark }}
                        >
                          {id}
                        </span>
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => onOpenChange(false)}
                  className="w-full h-14 rounded-xl text-white font-semibold transition-all active:scale-[0.98] mb-3"
                  style={{ backgroundColor: brand.colors.secondary }}
                >
                  Close
                </button>
                <p className="text-sm text-center" style={{ color: brand.colors.text.secondary }}>
                  Check the <span className="font-bold">Loyalty</span> section to view your tickets anytime.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}