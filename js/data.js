'use strict';

function click_button(){
    // Add clicks-per-click to clicks.
    core_storage_data['clicks'] = core_round({
      'decimals': 2,
      'number': core_storage_data['clicks'] + core_storage_data['clicks-per-click'] * core_storage_data['multiplier-per-click'],
    });

    core_storage_update();

    // Force click-button to lose focus.
    document.getElementById('click-button').blur();
}

function purchase(upgrade, cost, target, free){
    free = free || false;

    if(!free
      && core_storage_data['clicks'] < core_storage_data['upgrade-' + upgrade + '-cost']){
        return;
    }

    if(!free){
        // If user can afford upgrade, subtract cost of upgrade from clicks...
        core_storage_data['clicks'] = core_round({
          'decimals': 2,
          'number': core_storage_data['clicks'] - core_storage_data['upgrade-' + upgrade + '-cost'],
        });
    }

    // ...and increase upgrade/cost...
    core_storage_data['upgrade-' + upgrade] += 1;
    core_storage_data['upgrade-' + upgrade + '-cost'] *= upgrades[upgrade]['multiplier'];

    // ...and increase target value, either clicks-per-click or clicks-per-second.
    core_storage_data[target] = core_round({
      'decimals': 2,
      'number': core_storage_data[target] + upgrades[upgrade]['bonus'],
    });

    update_multiplied();
    core_storage_update();
}

function second(){
    core_storage_data['clicks'] = core_round({
      'decimals': 2,
      'number': core_storage_data['clicks'] + core_storage_data['clicks-per-second'] * core_storage_data['multiplier-per-second'],
    });

    core_storage_update();

    document.title = core_number_format({
      'number': core_storage_data['clicks'],
    });
}

function update_multiplied(){
    core_storage_data['clicks-per-click-multiplied'] = core_round({
      'decimals': 2,
      'number': core_storage_data['clicks-per-click'] * core_storage_data['multiplier-per-click'],
    });
    core_storage_data['clicks-per-second-multiplied'] = core_round({
      'decimals': 2,
      'number': core_storage_data['clicks-per-second'] * core_storage_data['multiplier-per-second'],
    });
}
