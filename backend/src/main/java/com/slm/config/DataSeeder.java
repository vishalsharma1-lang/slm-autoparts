package com.slm.config;

import com.slm.entity.Category;
import com.slm.entity.Product;
import com.slm.repository.CategoryRepository;
import com.slm.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepo;
    private final ProductRepository productRepo;

    @Override
    public void run(String... args) {
        if (categoryRepo.count() > 0) return;

        // ── Categories (Maruti Suzuki Genuine Parts) ──
        Category engine = save("Engine Parts", "engine-parts",
                "Genuine engine components, sensors, fuel injection, timing belts and more",
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400", 1);

        Category suspension = save("Suspension & Braking", "suspension-braking",
                "Shock absorbers, brake pads, struts, steering components and wheel bearings",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", 2);

        Category electrical = save("Electrical", "electrical",
                "Lighting, sensors, ignition, wipers, horns and wiring components",
                "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400", 3);

        Category body = save("Body Parts", "body-parts",
                "Bumpers, mirrors, glass, body panels, grilles and interior components",
                "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400", 4);

        Category ac = save("Air Conditioning", "air-conditioning",
                "AC compressor, blower, condenser, evaporator and heater unit assemblies",
                "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=400", 5);

        Category transmission = save("Transmission", "transmission",
                "Clutch, gear shift, automatic transmission and synchroniser components",
                "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400", 6);

        Category carCare = save("Car Care", "car-care",
                "Engine oil, coolant, brake fluid, grease, car wash and hygiene products",
                "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400", 7);

        Category diy = save("DIY & Tools", "diy-tools",
                "Car jack, dicky tools, spare tire components and emergency kits",
                "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400", 8);

        List<Product> products = new ArrayList<>();

        // ── Engine Parts ──
        products.add(p(engine, "Oil Filter - Genuine Maruti", "oil-filter",
                "Genuine Maruti Suzuki oil filter for precise filtration. Compatible: Swift, Baleno, Dzire, Ciaz, Ertiga.",
                "385", "1 Pc", "16510-61J00", "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:5df68db0-3c05-45d0-a4b7-1522cbf3a4c1/as/oil-filter.avif?width=500&format=webply&optimize=medium",
                true, "Swift,Baleno,Dzire,Ertiga", "oil filter,engine,maintenance"));

        products.add(p(engine, "Air Filter Element", "air-filter-element",
                "OEM air filter for optimal engine breathing and fuel efficiency. Suits Swift, Alto, WagonR, Dzire.",
                "650", "1 Pc", "13780-51K00",
                "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:5e70dc28-6d4c-4774-a7cc-edc386141795/as/air-filter.avif?width=500&format=webply&optimize=medium",
                false, "Swift,Alto,WagonR,Dzire", "air filter,engine,fuel efficiency"));

        products.add(p(engine, "Spark Plug (Iridium)", "spark-plug-iridium",
                "Genuine Maruti iridium spark plug for superior ignition and long life. Set of 4.",
                "1240", "Set of 4", "09482-00475",
                "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:95d8b6ad-f744-42e5-99ec-cad88c8e42c3/as/spark-plug.avif?width=500&format=webply&optimize=medium",
                true, "Swift,Baleno,Brezza,Ertiga", "spark plug,ignition,iridium"));

        products.add(p(engine, "Timing Belt Kit", "timing-belt-kit",
                "Complete timing belt kit with tensioner and idler. Prevents engine damage. Replace every 60,000 km.",
                "2850", "1 Kit", "17505-65D00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:fd2268ff-2891-409b-bee5-9a296de7981d/as/timing-belt--components.avif?width=400&id=1",
                false, "Swift,Dzire,Ertiga,Ciaz", "timing belt,engine,belt kit"));

        products.add(p(engine, "Engine Oil Sump Drain Plug", "oil-drain-plug",
                "Genuine drain plug with gasket for engine oil sump. Essential for every oil change.",
                "185", "1 Pc", "11128-83010",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:e5a469db-5be3-4431-a0bc-72b359949913/as/oil-chamber--oil-strainer.avif?width=400&id=1",
                false, "All Maruti Models", "drain plug,oil sump,engine"));

        products.add(p(engine, "Fuel Injector Assembly", "fuel-injector",
                "Precision OEM fuel injector for optimum fuel delivery and combustion efficiency.",
                "3200", "1 Pc", "15710-67JG0",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:0a7078aa-2449-4c8a-b25e-bfcb3735c5a1/as/fuel-injection-system.avif?width=400&id=1",
                true, "Swift,Baleno,Brezza,Ciaz", "fuel injector,engine,fuel system"));

        products.add(p(engine, "Coolant Thermostat", "coolant-thermostat",
                "Genuine thermostat valve to regulate engine temperature. Prevents overheating.",
                "780", "1 Pc", "17670-68L00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:923c0a79-af91-42f8-9df4-66c94d6baf60/as/engine-sensors.avif?width=400&id=1",
                false, "Swift,Alto K10,Dzire,WagonR", "thermostat,coolant,engine cooling"));

        products.add(p(engine, "Water Pump Assembly", "water-pump",
                "Genuine water pump with impeller for efficient coolant circulation in the engine.",
                "1650", "1 Pc", "17400-83EA0",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:ffde2ae7-b52a-4517-92b8-d4c6adc67f72/as/oil-pump--water-pump.avif?width=400&id=1",
                false, "Swift,Baleno,Dzire,Ertiga", "water pump,coolant,engine"));

        products.add(p(engine, "Radiator Assembly", "radiator-assembly",
                "OEM aluminum radiator for effective engine heat dissipation. Direct fit replacement.",
                "5800", "1 Pc", "17700-84M00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:1a8a9c2d-395c-4170-befa-d9cb88b3b784/as/radiators--inter-cooler.avif?width=400&id=1",
                false, "Swift,Brezza,Ertiga,Ciaz", "radiator,cooling,engine"));

        products.add(p(engine, "Gasket - Cylinder Head", "cylinder-head-gasket",
                "Genuine multi-layer steel cylinder head gasket for reliable sealing and longevity.",
                "1450", "1 Pc", "11141-64J00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:680de6d2-a882-41e5-90d6-ca2e74977c51/as/engine-components.avif?width=400&id=1",
                false, "Swift,Baleno,Dzire", "gasket,cylinder head,engine seal"));

        // ── Suspension & Braking ──
        products.add(p(suspension, "Front Brake Pad Set", "front-brake-pad-set",
                "Genuine Maruti front disc brake pads for reliable stopping power. Low-dust, low-noise formula.",
                "1480", "1 Set", "55810-77J30",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:631e8266-d395-4f91-88db-7bac076cc827/as/brake-pad-set.avif?width=400&id=1",
                true, "Swift,Baleno,Brezza,Dzire", "brake pads,braking,front disc"));

        products.add(p(suspension, "Rear Shock Absorber", "rear-shock-absorber",
                "Genuine gas-filled rear shock absorber for smooth ride quality and vehicle stability.",
                "2950", "1 Pc", "41611-61M00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:df4ae21e-4898-4a0f-9bf3-91098be399d3/as/rear-shock-absorber.avif?width=400&id=1",
                true, "Swift,WagonR,Alto,Dzire", "shock absorber,suspension,rear"));

        products.add(p(suspension, "Front Strut Assembly", "front-strut-assembly",
                "Complete front strut assembly with spring and top mount. Restores original handling.",
                "4800", "1 Pc", "41601-61MA0",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:4bc6d55f-a935-434a-b231-b9cecdd6d60c/as/front-strut-set.avif?width=400&id=1",
                false, "Swift,Baleno,Ciaz,Brezza", "front strut,suspension,handling"));

        products.add(p(suspension, "Front Lower Arm", "front-lower-arm",
                "Genuine front lower suspension arm (control arm) with bush for precise wheel alignment.",
                "3200", "1 Pc", "45201-84M00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:188e258a-211e-4dc8-babd-600e1931d10f/as/front-suspension-arms.avif?width=400&id=1",
                false, "Swift,Baleno,Dzire,Ertiga", "lower arm,suspension,alignment"));

        products.add(p(suspension, "Wheel Bearing Front Hub", "wheel-bearing-front",
                "Genuine sealed front hub wheel bearing unit. Eliminates wheel noise and vibration.",
                "1850", "1 Pc", "44300-70870",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:1733518c-91af-433c-a79c-869da17332b3/as/suspension--braking.avif?width=400&id=1",
                false, "Swift,WagonR,Alto,Dzire", "wheel bearing,hub,noise"));

        products.add(p(suspension, "Brake Disc Rotor - Front", "brake-disc-front",
                "Genuine vented front brake disc rotor. Precision machined for even pad contact and fade resistance.",
                "2200", "1 Pc", "55211-62J30",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:631e8266-d395-4f91-88db-7bac076cc827/as/brake-pad-set.avif?width=400&id=1",
                false, "Swift,Baleno,Brezza,Ciaz", "brake disc,rotor,braking"));

        products.add(p(suspension, "Tie Rod End Assembly", "tie-rod-end",
                "Genuine tie rod end for precise steering response. Includes lock nut.",
                "950", "1 Pc", "48810-81A00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:188e258a-211e-4dc8-babd-600e1931d10f/as/front-suspension-arms.avif?width=400&id=1",
                false, "Swift,Alto,WagonR,Dzire,Ertiga", "tie rod,steering,alignment"));

        products.add(p(suspension, "Drive Shaft (CV Axle)", "drive-shaft",
                "Genuine OEM drive shaft assembly with inner and outer CV joints. Complete with boots.",
                "6800", "1 Pc", "44102-83EA0",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:b5d295a6-3279-4d57-b754-401addd27674/as/transmission.avif?width=400&id=1",
                true, "Swift,Baleno,Brezza,Ertiga", "drive shaft,CV joint,axle"));

        products.add(p(suspension, "Stabiliser Link Rod", "stabiliser-link",
                "Genuine front stabiliser link (anti-roll bar link). Reduces body roll and improves handling.",
                "680", "1 Pc", "46660-81A00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:188e258a-211e-4dc8-babd-600e1931d10f/as/front-suspension-arms.avif?width=400&id=1",
                false, "Swift,Baleno,Brezza,Dzire", "stabiliser,sway bar,link"));

        // ── Electrical ──
        products.add(p(electrical, "Headlamp Assembly - LH", "headlamp-lh",
                "OEM left-hand headlamp assembly with projector beam. Direct plug-and-play fitment.",
                "4200", "1 Pc", "35320-61P00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:58bcd151-cb20-4575-ac8b-c1003ccac420/as/head-lamps.avif?width=400&id=1",
                true, "Swift (2018-2024)", "headlamp,lighting,projector"));

        products.add(p(electrical, "Tail Lamp Assembly - RH", "tail-lamp-rh",
                "Genuine right-hand tail lamp assembly with LED indicators. OEM plug connector.",
                "2800", "1 Pc", "35660-61R00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:a31d6c4e-f6ab-40ed-a477-8208d6367bab/as/tail-lamps.avif?width=400&id=1",
                false, "Swift (2018-2024)", "tail lamp,LED,lighting"));

        products.add(p(electrical, "Alternator Assembly", "alternator",
                "Genuine 65A alternator for reliable battery charging and electrical supply.",
                "7500", "1 Pc", "31400-68L50",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:383984af-ed6d-4f65-ba19-20903944d461/as/electrical.avif?width=400&id=1",
                false, "Swift,Baleno,Ertiga,Ciaz", "alternator,electrical,charging"));

        products.add(p(electrical, "Starter Motor Assembly", "starter-motor",
                "Genuine 1.0kW starter motor for reliable engine cranking in all conditions.",
                "5200", "1 Pc", "31100-70H30",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:383984af-ed6d-4f65-ba19-20903944d461/as/electrical.avif?width=400&id=1",
                false, "Swift,Alto,WagonR,Dzire", "starter motor,ignition,cranking"));

        products.add(p(electrical, "Horn Assembly - Twin Tone", "horn-twin-tone",
                "Genuine twin-tone horn set with high/low frequency. Loud, clear and durable.",
                "520", "1 Set", "38500-69H20",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:383984af-ed6d-4f65-ba19-20903944d461/as/electrical.avif?width=400&id=1",
                false, "All Maruti Models", "horn,electrical,twin tone"));

        products.add(p(electrical, "Wiper Blade - Front Pair", "wiper-blade-front",
                "Genuine frameless wiper blade pair for streak-free visibility in rain.",
                "680", "1 Pair", "38330-70890",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:383984af-ed6d-4f65-ba19-20903944d461/as/electrical.avif?width=400&id=1",
                false, "Swift,Baleno,Brezza,Ertiga", "wiper blade,visibility,wipers"));

        products.add(p(electrical, "Oxygen (Lambda) Sensor", "oxygen-sensor",
                "Genuine upstream O2 sensor for precise fuel mixture control and emission compliance.",
                "2850", "1 Pc", "18213-68L00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:923c0a79-af91-42f8-9df4-66c94d6baf60/as/engine-sensors.avif?width=400&id=1",
                false, "Swift,Baleno,Dzire,Ciaz", "oxygen sensor,emissions,fuel control"));

        products.add(p(electrical, "Ignition Coil Assembly", "ignition-coil",
                "Genuine pencil-type ignition coil for strong spark and smooth engine performance.",
                "1650", "1 Pc", "33410-77K00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:923c0a79-af91-42f8-9df4-66c94d6baf60/as/engine-sensors.avif?width=400&id=1",
                true, "Swift,Baleno,Brezza,Ertiga", "ignition coil,spark,electrical"));

        // ── Body Parts ──
        products.add(p(body, "Front Bumper Assembly", "front-bumper",
                "Genuine OEM front bumper with fog lamp provisions. Exact OEM color match available.",
                "7800", "1 Pc", "71711-61R00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:faf2043f-8a24-412c-a3eb-4215da2b5b2a/as/front-bumper.avif?width=400&id=1",
                true, "Swift (2018-2024)", "bumper,body,front"));

        products.add(p(body, "Rear Bumper Assembly", "rear-bumper",
                "Genuine rear bumper with PDC sensor holes. Paintable ABS material.",
                "6500", "1 Pc", "71801-61R00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:a8f92674-2804-4753-9b90-57e1d2bb8c94/as/bumpers--grilles.avif?width=400&id=1",
                false, "Swift (2018-2024)", "bumper,body,rear"));

        products.add(p(body, "Outside Rear View Mirror - LH", "orvm-lh",
                "Genuine power-folding ORVM with integrated turn indicator. LH driver side.",
                "3800", "1 Pc", "84701-61R30",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:08657b00-3af4-4b79-8a59-b120415a972d/as/rear-view-mirrors.avif?width=400&id=1",
                false, "Swift,Baleno,Brezza", "ORVM,mirror,power folding"));

        products.add(p(body, "Windshield Glass - Front", "windshield-front",
                "Genuine laminated front windshield with acoustic PVB interlayer and UV protection.",
                "9800", "1 Pc", "84511-61R00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:10fcad52-f52a-42a6-8553-76cb79d99858/as/glass--windshield.avif?width=400&id=1",
                false, "Swift (2018-2024)", "windshield,glass,front"));

        products.add(p(body, "Door Latch Assembly - Front RH", "door-latch-front-rh",
                "Genuine front right door latch mechanism with child safety lock provision.",
                "1250", "1 Pc", "82130-61R00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:e57e29a2-6aab-41ee-abaa-65b45602e406/as/body-components.avif?width=400&id=1",
                false, "Swift,Baleno,Dzire", "door latch,body,lock"));

        products.add(p(body, "Bonnet Hood Assembly", "bonnet-hood",
                "Genuine steel bonnet (hood) assembly. Comes primer-coated for painting.",
                "12500", "1 Pc", "57100-61R00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:e3d49291-21b3-42b6-9dfa-944eaed1a9e6/as/body-exteriors.avif?width=400&id=1",
                false, "Swift (2018-2024)", "bonnet,hood,body panel"));

        products.add(p(body, "Front Fender - LH", "front-fender-lh",
                "Genuine left-hand front fender/wing panel. Steel, primer-coated, direct fit.",
                "5200", "1 Pc", "57702-61R00",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:e3d49291-21b3-42b6-9dfa-944eaed1a9e6/as/body-exteriors.avif?width=400&id=1",
                false, "Swift (2018-2024)", "fender,wing,body panel"));

        // ── AC Parts ──
        products.add(p(ac, "AC Compressor Assembly", "ac-compressor",
                "Genuine scroll-type AC compressor with clutch. Ensures peak cooling performance.",
                "14500", "1 Pc", "95200-61JA0",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:fd63376f-2fb9-4f1a-a938-88446496478a/as/ac-compressor.avif?width=400&id=1",
                true, "Swift,Baleno,Brezza,Ertiga", "AC compressor,air conditioning,cooling"));

        products.add(p(ac, "AC Condenser Assembly", "ac-condenser",
                "Genuine aluminum parallel-flow AC condenser for efficient heat rejection.",
                "5800", "1 Pc", "95300-61JA0",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:8d4797c9-38f5-44b5-ae00-09d311decee4/as/ac-condensor-assembly.avif?width=400&id=1",
                false, "Swift,Baleno,Brezza", "AC condenser,air conditioning"));

        products.add(p(ac, "Blower Motor Assembly", "blower-motor",
                "Genuine HVAC blower motor with fan cage. Restores full airflow in cabin.",
                "2400", "1 Pc", "74250-61JA0",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:5eed359d-2b8c-4744-8acd-c4e0a38b3b10/as/ac-blower--components.avif?width=400&id=1",
                false, "Swift,Baleno,WagonR,Dzire", "blower,AC,cabin airflow"));

        products.add(p(ac, "AC Evaporator Assembly", "ac-evaporator",
                "Genuine aluminum evaporator core for ice-cold cabin cooling efficiency.",
                "4200", "1 Pc", "95350-61JA0",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:a2649aee-de7f-4d19-b1e7-4ec7b5998267/as/ac-evaporator.avif?width=400&id=1",
                false, "Swift,Baleno,Brezza,Ertiga", "evaporator,AC,cooling core"));

        // ── Transmission ──
        products.add(p(transmission, "Clutch Disc", "clutch-disc",
                "Genuine organic clutch disc with torsional damper springs for smooth engagement.",
                "2200", "1 Pc", "22400-65J20",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:da202dc7-7fc4-4075-9995-384a067e330b/as/clutch.avif?width=400&id=1",
                true, "Swift,Alto,WagonR,Dzire,Ertiga", "clutch disc,transmission,manual"));

        products.add(p(transmission, "Clutch Pressure Plate", "clutch-pressure-plate",
                "Genuine diaphragm-spring pressure plate for precise clutch engagement.",
                "3800", "1 Pc", "22300-65J20",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:da202dc7-7fc4-4075-9995-384a067e330b/as/clutch.avif?width=400&id=1",
                false, "Swift,Alto,WagonR,Dzire", "clutch plate,pressure plate,transmission"));

        products.add(p(transmission, "Clutch Release Bearing", "clutch-release-bearing",
                "Genuine throw-out bearing for smooth clutch pedal operation and release.",
                "780", "1 Pc", "23260-80901",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:9583ab12-300e-486a-a7cd-8f2eb4fb59f2/as/clutch-release.avif?width=400&id=1",
                false, "Swift,Alto,WagonR,Dzire,Ertiga", "clutch bearing,release bearing,transmission"));

        products.add(p(transmission, "Gear Shift Lever Boot", "gear-shift-boot",
                "Genuine leather-look gear lever boot to replace cracked or worn interiors.",
                "480", "1 Pc", "28880-70890",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:06f19a18-d2bb-48e7-ad40-110869d486f4/as/gear-shift.avif?width=400&id=1",
                false, "All Manual Maruti Models", "gear shift,boot,interior"));

        // ── Car Care ──
        products.add(p(carCare, "Maruti Genuine Engine Oil 10W30 (3.5L)", "engine-oil-10w30",
                "Genuine Maruti API SN grade semi-synthetic engine oil. Recommended for petrol engines.",
                "1299", "3.5 Litres", "99000-99032-035",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:d34ca1c7-7fff-4e02-8fb7-d9b0f7889ef7/as/grease--oil.avif?width=400&id=1",
                true, "All Petrol Maruti Models", "engine oil,10W30,lubricant,maintenance"));

        products.add(p(carCare, "Maruti Genuine Coolant (1L)", "radiator-coolant",
                "Genuine green long-life antifreeze coolant. Pre-mixed 50% concentration ready to use.",
                "380", "1 Litre", "99000-99070-D01",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:bd830211-ae8f-42bb-a7ee-d24c4185058e/as/coolant--brake-fluid.avif?width=400&id=1",
                false, "All Maruti Models", "coolant,antifreeze,radiator,maintenance"));

        products.add(p(carCare, "Brake Fluid DOT3 (350ml)", "brake-fluid",
                "Genuine DOT3 brake fluid for reliable brake hydraulic performance in all conditions.",
                "220", "350 ml", "99000-99002-030",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:bd830211-ae8f-42bb-a7ee-d24c4185058e/as/coolant--brake-fluid.avif?width=400&id=1",
                false, "All Maruti Models", "brake fluid,DOT3,braking,maintenance"));

        products.add(p(carCare, "Maruti Multipurpose Grease (400g)", "multipurpose-grease",
                "Genuine lithium-based grease for chassis, bearings and suspension components.",
                "280", "400 g", "99000-99032-GR1",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:d34ca1c7-7fff-4e02-8fb7-d9b0f7889ef7/as/grease--oil.avif?width=400&id=1",
                false, "All Maruti Models", "grease,lubricant,chassis,bearing"));

        products.add(p(carCare, "Car Wash Shampoo (500ml)", "car-wash-shampoo",
                "Genuine Maruti pH-neutral car shampoo. Safe on all paint and clear coats.",
                "199", "500 ml", "99000-99070-SH1",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:816b2cda-8d57-4791-a49c-7083e7d40d9d/as/car-wash.avif?width=400&id=1",
                false, "All Vehicles", "car wash,shampoo,cleaning,car care"));

        // ── DIY & Tools ──
        products.add(p(diy, "Genuine Scissor Jack with Handle", "scissor-jack",
                "Genuine Maruti scissor-type car jack with handle. Rated for 1000kg. Compact storage.",
                "850", "1 Set", "09140-71001",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:cde6fa2d-3f40-4cfb-9502-5e2f7bc566b5/as/car-care.avif?width=400&id=1",
                false, "All Maruti Models", "car jack,scissor jack,DIY,tools"));

        products.add(p(diy, "Tyre Puncture Repair Kit", "puncture-repair-kit",
                "Genuine compact tyre sealant and inflator kit. Seals punctures up to 6mm. No jack needed.",
                "1200", "1 Kit", "99000-99070-PK1",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:cde6fa2d-3f40-4cfb-9502-5e2f7bc566b5/as/car-care.avif?width=400&id=1",
                true, "All Vehicles", "puncture,tyre repair,emergency,kit"));

        products.add(p(diy, "Wheel Spanner (Lug Wrench)", "wheel-spanner",
                "Genuine cross-type wheel spanner for easy lug nut removal during tyre changes.",
                "320", "1 Pc", "09140-20003",
                "https://prod-arena.marutisuzuki.com/adobe/assets/urn:aaid:aem:cde6fa2d-3f40-4cfb-9502-5e2f7bc566b5/as/car-care.avif?width=400&id=1",
                false, "All Maruti Models", "wheel spanner,lug wrench,tools,DIY"));

        productRepo.saveAll(products);
    }

    private Category save(String name, String slug, String desc, String img, int order) {
        return categoryRepo.save(Category.builder()
                .name(name).slug(slug).description(desc)
                .imageUrl(img).displayOrder(order).build());
    }

    private Product p(Category cat, String name, String slug, String desc,
                      String price, String weight, String partNo, String img,
                      boolean featured, String vehicles, String tags) {
        return Product.builder()
                .category(cat).name(name).slug(slug).description(desc)
                .price(new BigDecimal(price)).weight(weight).imageUrl(img)
                .isActive(true).isVeg(false).isFeatured(featured)
                .stock(50).tags(tags + "," + vehicles).build();
    }
}
