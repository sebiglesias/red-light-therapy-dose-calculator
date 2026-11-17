
function updateCustomField() {
  const select = document.getElementById('treatmentTarget');
  const customGroup = document.getElementById('customJoulesGroup');
  if (select.value === 'custom') {
    customGroup.style.display = 'block';
  } else {
    customGroup.style.display = 'none';
  }
  calcRlt();
}

function calcRlt() {
  const baseIrradiance = parseFloat(document.getElementById('deviceIrradiance').value) || 65;
  const selectVal = document.getElementById('treatmentTarget').value;
  let targetJ = 4;
  if (selectVal === 'custom') {
    targetJ = parseFloat(document.getElementById('targetJoules').value) || 10;
  } else {
    targetJ = parseFloat(selectVal);
  }

  const dist = parseFloat(document.getElementById('distanceInches').value) || 6;

  // Formula: Time (seconds) = (Target Joules/cm² * 1000) / Irradiance (mW/cm²)
  const totalSeconds = (targetJ * 1000) / Math.max(1, baseIrradiance);
  const minutes = Math.floor(totalSeconds / 60);
  const remainderSeconds = Math.round(totalSeconds % 60);

  let formattedTime = minutes + " min " + remainderSeconds + " sec";
  if (minutes === 0) {
    formattedTime = remainderSeconds + " seconds";
  }

  document.getElementById('resDuration').textContent = formattedTime;
  document.getElementById('resDeliveredJoules').textContent = targetJ.toFixed(1) + ' J/cm²';
  document.getElementById('resEffectivePower').textContent = baseIrradiance.toFixed(1) + ' mW/cm²';
  document.getElementById('resTotalSec').textContent = Math.round(totalSeconds) + ' seconds';
}

document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', calcRlt);
  el.addEventListener('change', calcRlt);
});
document.getElementById('treatmentTarget').addEventListener('change', updateCustomField);
window.addEventListener('DOMContentLoaded', calcRlt);
        