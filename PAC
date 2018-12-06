% Created by Meng-Yun Wang

% Adopted from Mike Cohen
% 12-06-2018

%%
clear all
clc

load eeg.mat

% define your parameters

L_freq = 2:20;  % which low frequency you will use, could be a signle numble and also can be a range
H_freq = 20:5:EEG.srate/2; % same as the low frequency
time2save = -200:100:5000; % if you want to compute the dynamic PAC you can use this; or you can use the whole big trial
time_idx = dsearchn (EEG.times', time2save); % find the index of your variable time2save
cycle = 3; % highlight temporal precision over frequency precision; a small cycle thus is recommended


eegdata = reshpae (EEG.data (16,:,:), 1, EEG.pnts*EEG.trials); % select one channel for coupling
% eegdata2 = reshap (EEG.data (17:,:,:),1,EEG.pnts*EEG.trials); % you can select another channel for coupling 

wave_time = -1:1/EEG.srate:1; % define the time range of wave
half_wav= length(wave_time)/2;
n_cov = length (eegdata)+length (wave_time)-1;

fft_eeg = fft (eegdata, n_cov); % frequency transform

PACz = zeros(size(L_freq),size(H_freq),size(time2save));

for phasei = 1:length (L_freq); % First loop for each low frequency, you can also select a specific channel
    
    % compute the time frequency of low requency
    wavelet = exp(2*1i*pi*L_freq(phasei).*wave_time) .* exp(-wave_time.^2./(2*(4/(2*pi*L_freq(phasei)))^2));
    fft_wav = fft(wavelet,n_cov);
    L_TF = ifft(fft_wav.*fft_eeg,n_cov);
    L_TF = L_TF(half_wav+1:end-half_wav);
    L_tf = reshape(L_TF,EEG.pnts,EEG.trials);
    cycle_time_L = 3*(EEG.srate/H_freq(fi)); % compte how many data points in 3 cycle of this frequency
    
    for fi=1:length(H_freq) % Second loop for each high frequency, you can also select a specific channel
        
        % compute the time frequency of high requency
        wavelet = exp(2*1i*pi*H_freq(fi).*wa_time) .* exp(-wav_time.^2./(2*(4/(2*pi*H_freq(fi)))^2));
        fft_wav = fft(wavelet,n_cov);
        H_TF = ifft(fft_wav.*fft_eeg,n_cov);
        H_TF = H_TF(half_wav+1:end-half_wav);
        H_tf = reshape(H_TF,EEG.pnts,EEG.trials);
        cycle_time_H = 3*(EEG.srate/H_freq(fi)); % compte how many data points in 3 cycle of this frequency
        
        for timei = 1:length (time2save);% third loop for dynamic procedure, you can also use the whole time range
            
            % extract the phase and power of low and high frequency, respectively
            L_phase = angle(L_tf(time_idx-round(cycle_time_L/2):time_idx+round(cycle_time_L/2),:));
            H_power = abs(H_tf(time_idx-round(cycle_time_H/2):time_idx+round(cycle_time_H/2),:)).^2;
            
            % compute the actual PAC value
            PAC_real = abs(mean( reshape(H_power,1,[]).*exp(1i*reshape(L_phase,1,[])) ));
            % compute the permutted PAC value and then compute the PACz
            permui = 2000;
            PAC_perm = zeros(1,permui);
            for ii =1:permui
                % select a number (EEG.trials) of values form cycle_time_H with replacement
                startpt_rand = randsample(round(cycle_time_H*.8),EEG.trials,1)+round(cycle_time_H*.1);
                H_power_perm = zeros (size(H_power));
                
                for triali=1:EEG.trials
                    H_power_perm(:,triali) = H_power([startpt_rand(triali):end 1:startpt_rand(triali)-1],triali);
                end
                
                PAC_perm(ii) = abs(mean( reshape(H_power_perm,1,[]).*exp(1i*reshape(L_phase,1,[])) ));
            end
            PACz(phasei,fi,timei) = (PAC_real-mean(PAC_perm))/std(PAC_perm); % 
        end
    end
end
