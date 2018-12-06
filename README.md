# Cross Frequency Coupling
Learning notes from chapter 30 in Max’s book, _Analyzing neural time series data: Theory and practice._
***

## What is CFC?
Cross-frequency coupling refers to a statistical relationship between activities in two different frequency bands, has been observed in many species and in many brain regions, and has been linked to several cognitive processes and disease states (_Canolty and Knight 2010_).

**CFC** comprises four different subtypes, such as Phase-Phase Coupling (**PPC**), Amplitude-Amplitude Coupling (**AAC**), Phase-Amplitude Coupling (**PAC**) and Phase-Frequency Coupling (**PFC**) (_Jensen, & Colgin, 2007; Hyafil, Giraud, Fontolan, & Gutkin, 2015_). Among them, **PAC** is perhaps the most commonly used method for calculating **CFC** (_Canoolty et al., 2006_) and has been confirmed in physiology studies (_Bragin et al., 1995; Jesen &Colgin 2007; Lakatos et al., 2005_) and computational and theoretical simulations (_Lisman 2005_).

_Refs:_
_Bragin, A., Jandó, G., Nádasdy, Z., Hetke, J., Wise, K., & Buzsáki, G. (1995). Gamma (40-100 Hz) oscillation in the hippocampus of the behaving rat. Journal of Neuroscience, 15(1), 47-60._

_Lakatos, P., Shah, A. S., Knuth, K. H., Ulbert, I., Karmos, G., & Schroeder, C. E. (2005). An oscillatory hierarchy controlling neuronal excitability and stimulus processing in the auditory cortex. Journal of neurophysiology, 94(3), 1904-1911._

_Lisman, J. (2005). The theta/gamma discrete phase code occuring during the hippocampal phase precession may be a more general brain coding scheme. Hippocampus, 15(7), 913-922._

_Canolty, R. T., Edwards, E., Dalal, S. S., Soltani, M., Nagarajan, S. S., Kirsch, H. E., ... & Knight, R. T. (2006). High gamma power is phase-locked to theta oscillations in human neocortex. Science, 313(5793), 1626-1628._

_Jensen, O., & Colgin, L. L. (2007). Cross-frequency coupling between neuronal oscillations. Trends in cognitive sciences, 11(7), 267-269._

_Canolty, R. T., & Knight, R. T. (2010). The functional role of cross-frequency coupling. Trends in cognitive sciences, 14(11), 506-515._

_Hyafil, A., Giraud, A. L., Fontolan, L., & Gutkin, B. (2015). Neural cross-frequency coupling: connecting architectures, mechanisms, and functions. Trends in neurosciences, 38(11), 725-740._

## How to compute **PAC**?
The quantification of **PAC** is based on Euler’s formula. The length of the average vector is the measure of **PAC** (_Canolty et al., 2006_):

![](https://github.com/MengYunWang/CFC/blob/master/formula.jpg)

where t is time point, a is the power of a high frequency at time point t, i is the imaginary operator, θ is the phase angle of a low frequency at time point t, and n is the total number of time points.

Nonparametric permutation testing to determine how PAC value compares to a distribution of PAC values expected under null hypothesis.

## How to compute **AAC**

## How to compute **PPC**
Phase synchronization can be computed between the phase of the upper-frequency power time series and the phase of the lower frequency (_Mormann et al. 2005_).

Step 1: compute the phase of low frequency at each time point

Step2: compute the power of high frequency and convolving with the same wavelet used for the low frequency, for example, power of 70Hz convolved with a 12 Hz wavelet.

Step3: compute the phase of high frequency and use the same method in **ISPC**.

_Mormann, F., Fell, J., Axmacher, N., Weber, B., Lehnertz, K., Elger, C. E., & Fernández, G. (2005). Phase/amplitude reset and theta–gamma interaction in the human medial temporal lobe during a continuous word recognition memory task. Hippocampus, 15(7), 890-900._

