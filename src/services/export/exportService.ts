import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface PrayerRecord {
    date: string;
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
}

interface ExportData {
    prayerRecords: PrayerRecord[];
    streak: number;
    totalDays: number;
    completionRate: number;
    startDate: string;
    endDate: string;
}

/**
 * Generate CSV content from prayer data
 */
export const generateCSV = (data: ExportData): string => {
    const header = 'Tanggal,Subuh,Dzuhur,Ashar,Maghrib,Isya,Total\n';

    const rows = data.prayerRecords.map(record => {
        const completed = [record.fajr, record.dhuhr, record.asr, record.maghrib, record.isha]
            .filter(Boolean).length;
        return `${record.date},${record.fajr ? 'Ya' : 'Tidak'},${record.dhuhr ? 'Ya' : 'Tidak'},${record.asr ? 'Ya' : 'Tidak'},${record.maghrib ? 'Ya' : 'Tidak'},${record.isha ? 'Ya' : 'Tidak'},${completed}/5`;
    }).join('\n');

    const summary = `\n\n=== RINGKASAN ===\nPeriode,${data.startDate} - ${data.endDate}\nTotal Hari,${data.totalDays}\nStreak Terbaik,${data.streak} hari\nTingkat Konsistensi,${data.completionRate}%`;

    return header + rows + summary;
};

/**
 * Generate simple text report (for PDF-like output)
 */
export const generateTextReport = (data: ExportData): string => {
    const title = '📿 LAPORAN SHOLAT - SHOLATKU\n';
    const separator = '═'.repeat(40) + '\n';

    let report = title + separator;
    report += `Periode: ${data.startDate} - ${data.endDate}\n`;
    report += separator;

    report += '\n📊 STATISTIK\n';
    report += `• Total Hari Tercatat: ${data.totalDays} hari\n`;
    report += `• Streak Terbaik: ${data.streak} hari berturut-turut\n`;
    report += `• Tingkat Konsistensi: ${data.completionRate}%\n`;

    report += '\n📅 RINCIAN HARIAN\n' + separator;

    data.prayerRecords.forEach(record => {
        const completed = [record.fajr, record.dhuhr, record.asr, record.maghrib, record.isha];
        const count = completed.filter(Boolean).length;
        const checkmarks = completed.map(c => c ? '✓' : '✗').join(' ');
        report += `${record.date}: ${checkmarks} (${count}/5)\n`;
    });

    report += '\n' + separator;
    report += 'Digenerate oleh SholatKu App\n';
    report += `Tanggal: ${format(new Date(), 'd MMMM yyyy HH:mm', { locale: id })}\n`;

    return report;
};

/**
 * Export data to CSV file
 */
export const exportToCSV = async (data: ExportData): Promise<string> => {
    const csvContent = generateCSV(data);
    const fileName = `SholatKu_Report_${format(new Date(), 'yyyyMMdd_HHmm')}.csv`;
    const filePath = FileSystem.documentDirectory + fileName;

    await FileSystem.writeAsStringAsync(filePath, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
    });

    return filePath;
};

/**
 * Export data to text file (PDF alternative)
 */
export const exportToText = async (data: ExportData): Promise<string> => {
    const textContent = generateTextReport(data);
    const fileName = `SholatKu_Report_${format(new Date(), 'yyyyMMdd_HHmm')}.txt`;
    const filePath = FileSystem.documentDirectory + fileName;

    await FileSystem.writeAsStringAsync(filePath, textContent, {
        encoding: FileSystem.EncodingType.UTF8,
    });

    return filePath;
};

/**
 * Share the exported file
 */
export const shareFile = async (filePath: string): Promise<void> => {
    const canShare = await Sharing.isAvailableAsync();

    if (canShare) {
        await Sharing.shareAsync(filePath, {
            mimeType: filePath.endsWith('.csv') ? 'text/csv' : 'text/plain',
            dialogTitle: 'Bagikan Laporan Sholat',
        });
    } else {
        throw new Error('Sharing is not available on this device');
    }
};

/**
 * Export and share in one step
 */
export const exportAndShare = async (
    data: ExportData,
    format: 'csv' | 'text'
): Promise<void> => {
    const filePath = format === 'csv'
        ? await exportToCSV(data)
        : await exportToText(data);

    await shareFile(filePath);
};
